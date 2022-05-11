"""
This script is intended to output the necessary ResourceManager calls to load all the assets used in the project,
hence automating the process of having to copy file names from the /assets folder into the preload function.
"""

import os
import subprocess

def add_asset(root, file_name):
    fun = ""

    ext = os.path.splitext(file_name)[1][1:]
    if ext in ("wav", "ogg"):
        fun = "getSound"
    elif ext in ("png", "jpg"):
        fun = "getSprite"
    elif ext in ("otf", "ttf"):
        fun = "getFont"
    else:
        return None

    return f'ResourceManager.{fun}("{os.path.join(root, file_name)}");'

assets = []
for root, directory, files in os.walk("assets"):
    assets.extend([(add_asset(root, file)) for file in files if add_asset(root, file) is not None])
print("// This function was generated automatically. Please do not edit manually.\n", "\n".join(assets), sep="")