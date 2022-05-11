import * as p5 from "p5";
import { Keys } from "../Framework/Enumarable/Keys.js";
import { imageScaled, rotatedImage } from "../Framework/Extensions.js";
import { KeyboardManager } from "../Framework/KeyboardManager.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Text } from "../Framework/Text.js";
import { Game } from "../Game/Game.js";
import { OverworldScene } from "../Scene/OverworldScene.js";
import { StaticSprite } from "./StaticSprite.js";

export class TextBox extends StaticSprite
{
    private str: string;
    private isComplete: boolean;
    private currentCharacter: number;
    private static readonly TEXT_BEGINNING: [number, number] = [29, 170];
    private static readonly MAX_WIDTH: number = 260; // Maximum width of a single line of text
    private static readonly WHITE_BORDER_SIZE: number = 3;
    private static readonly GRAY_BORDER_SIZE: number = 1;
    constructor(str: string)
    {
        super(19, 163); // Bottom-of-the-screen text box
        this.str = str;
        this.currentCharacter = 0;
        this.isComplete = false;
    }

    update()
    {
        if (KeyboardManager.KeyIsHeld(Keys.C) || KeyboardManager.KeyIsPressed(Keys.X))
        {
            this.currentCharacter = this.str.length;
            if (KeyboardManager.KeyIsHeld(Keys.C))
                this.isComplete = true;
        }

        if (this.currentCharacter < this.str.length)
        {   
            this.currentCharacter++;
            ResourceManager.getSound("assets/sfx/text.wav").play();
        }

        if (KeyboardManager.KeyIsPressed(Keys.Z) && this.currentCharacter >= this.str.length)
        {
            this.isComplete = true;
        }
    }
    draw()
    {
        push();
        rectMode(CORNERS);
        noStroke();
        
        const frame = Math.floor((Game.GetFrameCount() % 32) / 4);
        const cornerSprite = ResourceManager.getSprite(`assets/spr/textbox_topleft_${frame}.png`);

        // White outline of the box
        fill(255);
        rect(
            Game.resolution*(this.x + cornerSprite.width/2),
            Game.resolution*(this.y-TextBox.WHITE_BORDER_SIZE),
            Game.resolution*(301.5-cornerSprite.width/2),
            Game.resolution*(232.5+TextBox.WHITE_BORDER_SIZE)
        );

        rect(
            Game.resolution*(this.x - TextBox.WHITE_BORDER_SIZE),
            Game.resolution*(this.y + cornerSprite.height/2),
            Game.resolution*(301.5 + TextBox.WHITE_BORDER_SIZE),
            Game.resolution*(232.5 - TextBox.WHITE_BORDER_SIZE)
        );

        // Shadow around the inner rim of the box
        fill("#9da2c4");
        rect(
            Game.resolution*(this.x-TextBox.GRAY_BORDER_SIZE),
            Game.resolution*(this.y-TextBox.GRAY_BORDER_SIZE),
            Game.resolution*(301.5+TextBox.GRAY_BORDER_SIZE),
            Game.resolution*(232.5+TextBox.GRAY_BORDER_SIZE)
        );

        // Black interior of the box
        fill(0);
        rect(
            Game.resolution*this.x,
            Game.resolution*this.y,
            Game.resolution*301.5,
            Game.resolution*232.5
        );
        pop();

        
        
        // Draw corners
        push();
        angleMode(DEGREES);
        imageMode(CENTER);
        imageScaled(cornerSprite,
            Game.resolution*(this.x + TextBox.GRAY_BORDER_SIZE),
            Game.resolution*(this.y + TextBox.GRAY_BORDER_SIZE)
        );
        rotatedImage(cornerSprite,
            Game.resolution*(301.5 - TextBox.GRAY_BORDER_SIZE),
            Game.resolution*(this.y + TextBox.GRAY_BORDER_SIZE),
            90
        );
        rotatedImage(cornerSprite,
            Game.resolution*(301.5 - TextBox.GRAY_BORDER_SIZE),
            Game.resolution*(232.5 - TextBox.GRAY_BORDER_SIZE),
            180
        );
        rotatedImage(cornerSprite,
            Game.resolution*(this.x + TextBox.GRAY_BORDER_SIZE),
            Game.resolution*(232.5 - TextBox.GRAY_BORDER_SIZE),
            270
        );
        pop();

        // Implement wrapping behavior when text is too long to fit in the box
        let i = 0;
        let j = 1;
        let h = 0;
        let s: string = "";
        do {
            do
            {
                s = this.str.slice(i, j);
                j++;
            } while (this.StringPasses(s) && j <= this.currentCharacter && j <= this.str.length);
            s = this.str.slice(i, j);
            Text.Draw(s, Game.resolution*TextBox.TEXT_BEGINNING[0], Game.resolution*(TextBox.TEXT_BEGINNING[1] + h));
            i = j;
            h += 18;
        } while (j < this.currentCharacter && j < this.str.length);
    }

    private StringPasses(str: string)
    {
        return Text.GetWidth(str) < (TextBox.MAX_WIDTH + (this.x - TextBox.TEXT_BEGINNING[0])) * Game.resolution;
    }

    public IsComplete()
    {
        return this.isComplete;
    }
}