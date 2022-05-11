# Spamton NEO — Web version
This project is an attempt at porting the spectacular Spamton NEO boss fight from Delatarune to the web, thus allowing you to enter close combat with the deceptive, oleaginous grifter himself without having to play through the game all the way to him, nor shoulder through the infamous basement challenge before you get to the boss fight.
Hopefully this makes for a fun thing to do online :)

# Credits
Thanks ever so kindly to all people involved in making this project possible. In particular, I would like to extend my thanks to Toby Fox & the Deltarune team for the original inspiration. I also owe the following thanks for my using third-party resources besides the existing game ones, assets which have been invaluable in saving much time and effort:
* The `JF-Dot-Shinonome-14-Regular` font, the Japanese font that spared hours of staring at kanji (http://jikasei.me/font/jf-dotfont/)
* `Determination Mono`, a font made to imitate the Undertale/Deltarune font as best as possible (author: Harry Wakamatsu).

# Setup
If you want to run this on your own computer/server, you'll first need a way to host a local web server. I would recommend the "Live Server" extension for Visual Studio Code, but any method to achieve this setup will work. 

## TypeScript
To build this project from source, you will need to have access to the TypeScript compiler. If you have `npm` installed, run `npm install -g typescript`.
To set up the necessary node modules as well, do `npm install --save-dev @types/p5` and `npm install p5`.
With that, the dependencies should be configured and the webserver ready to launch!

## Note on p5.js

I haven't included the `p5.js` and `p5.sound.min.js` files referenced in `index.html` in this repo, as they are external dependencies and just pollute the repo. For development purposes, it is more convenient to have them available in the local directory, though, so you can download the `p5` libraries like so:

`curl https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js > p5.js`

`curl https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/addons/p5.sound.min.js > p5.sound.min.js`

Alternatively, you can download the files from the CDN (see links above) using a web browser.