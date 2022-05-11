import { Languages } from "../Framework/Enumarable/Language.js";
import { MouseManager } from "../Framework/MouseManager.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { Flag } from "../Sprite/Flag.js";
import { OverworldScene } from "./OverworldScene.js";
import { Scene } from "./Scene.js";

export class LanguageSelectScene extends Scene 
{
    private flagEN: Flag;
    private flagJA: Flag;

    private readonly SPACING = 120; // Horizontal spacing between flags
    
    constructor() 
    {
        super();

        const enX = 84 - (this.SPACING/4);
        const jaX = 160 + (this.SPACING/4);
        this.flagEN = new Flag(enX, 94, ResourceManager.getSprite("assets/spr/flag-us.png"));
        this.flagJA = new Flag(jaX, 94, ResourceManager.getSprite("assets/spr/flag-jp.png"));
    }
    
    init() {}

    update() 
    {
        background(0);
        this.flagEN.draw();
        this.flagJA.draw();
        if (this.flagEN.IsBeingHoveredOver() || this.flagJA.IsBeingHoveredOver())
        {
            cursor(HAND);
            if (MouseManager.MousePressed())
            {
                cursor(ARROW);
                const language = (this.flagEN.IsBeingHoveredOver()) ? Languages.ENGLISH : Languages.JAPANESE;
                Game.SetLanguage(language);
                Game.ChangeScene(new OverworldScene());              
            }
        }
        else
            cursor(ARROW)
    }
}