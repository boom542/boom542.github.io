import * as p5 from "p5";
import { Game } from "../Game/Game.js";

// p5.js functions modified for use in the game, and other globally useful custom functions.

export function imageScaled(im: p5.Image, x: number, y: number, factor: number = 1): void
{
    const adjustedFactor = Game.resolution * factor;
    image(im, x, y, im.width * adjustedFactor, im.height * adjustedFactor);
}

export function rotatedImage(im: p5.Image, x: number, y: number, angle: number) {
    push();
    angleMode(DEGREES);
    let tx = x
    let ty = y
    translate(tx, ty);
    rotate(angle);
    translate(-tx, -ty);
    imageScaled(im, x, y);
    pop();
}

export function ToWorld(value: number): number
{
    return value / Game.resolution;
}

export function WorldMousePos(): [number, number]
{
    return [ToWorld(mouseX), ToWorld(mouseY)];
}