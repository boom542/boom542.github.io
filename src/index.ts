import { Keys } from "./Framework/Enumarable/Keys.js";
import { Game } from "./Game/Game.js";
import { Sketch } from "./Sketch/Sketch.js";


// Hack to allow overriding nonexistent window properties
interface p5Window extends Window 
{
    preload: CallableFunction,
    setup: CallableFunction,
    draw: CallableFunction,
    keyPressed: CallableFunction
}

// Using p5.js to manage the canvas, etc.
declare let window: p5Window;
window.preload = function () {
    Sketch.preload();
}

window.setup = function() {
    Sketch.setup();
}

window.draw = function () {
    Sketch.draw();
}

window.keyPressed = function() {
    // const fs = fullscreen();
    // if (keyCode === Keys.F4)
    // {
    //     fullscreen(!fs);
    // }
    // Game.resolution = 2 + (2 * +true);
    // resizeCanvas(320 * Game.resolution, 240 * Game.resolution);
}