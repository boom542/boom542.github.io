import { imageScaled } from "../Framework/Extensions.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { StaticSprite } from "./StaticSprite.js";

export class Rail extends StaticSprite 
{
    draw()
    {
        // Draw the rail
        const tex = ResourceManager.getSprite("assets/spr/sneo_track.png");
        if (tex)
            imageScaled(tex, ...this.screenPosition());
    }
}