import { Game } from "../Game/Game.js";

export abstract class Sprite
{
    protected x: number = 0;
    protected y: number = 0;
    public abstract draw(): void;
    public abstract update(): void;

    protected screenPosition(): [number, number]
    {
        return Game.CurrentScene().GetRelativeCanvasPosition(this.x, this.y);
    }
}