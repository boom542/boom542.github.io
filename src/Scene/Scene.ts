import { Camera } from "../Framework/Camera.js";
import { Game } from "../Game/Game.js";

export abstract class Scene 
{
    protected camera: Camera;
    public abstract init(): void;
    public abstract update(): void;

    constructor() {
        this.camera = new Camera();
    }

    GetPositionRelativeToCamera(x: number, y: number): [number, number]
    {
        return [x - this.camera.x, y - this.camera.y]; 
    }

    GetCanvasPosition(x: number, y: number): [number, number]
    {
        return [x * Game.resolution, y * Game.resolution];
    }

    GetRelativeCanvasPosition(x: number, y: number)
    {
        return this.GetCanvasPosition(...this.GetPositionRelativeToCamera(x, y));
    }
    
}