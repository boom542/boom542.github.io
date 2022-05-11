"""
This script is intended to print all necessary JavaScript dependencies from the source tree for use in the `index.html` file.
The reason it checks the `src` directory and goes to the trouble of replacing `src` with `dist` and `.ts` with 
`.js` is that the `dist` directory can become bloated with old files over time, and deleting them can be a pain
without the right automation. This is the easiest way to only copy the files that'll be used in the build
and not worry about junk JavaScript files.
Something annoying is the importance of the load order of scripts: they must be defined in the correct order so as to
work properly, otherwise they will not load as intended and some names will be unavailable when needed.
Otherwise, I would just have this script directly alter the file.
"""

import re
import os
import subprocess

subprocess.run(["tsc"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL) # Ensure project is compiled
with open("index.html", encoding="utf-8", mode="r") as index:
    content = index.read()

    javascript_files = []
    current_root, root_files = "", []
    for root, directory, files in os.walk("src"):
        if root != current_root:
            root_files.sort(key = lambda k: len(k))
            javascript_files.extend(root_files)
            current_root = root
            root_files = []
        for file in files:
            if file.endswith(".ts"):
                if root.startswith("src"):
                    root = "dist" + root[3:]
                file = file[:-3] + ".js"
                root_files.append(os.path.join(root, file))
    root_files.sort(key = lambda k: len(k))
    javascript_files.extend(root_files)

    script_tags = "    " + "\n    ".join([f'<script type="module" src="{file}"></script>' for file in javascript_files])

    print(script_tags)