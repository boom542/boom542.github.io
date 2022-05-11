import { SoundFile } from "p5";
import { Camera } from "../Framework/Camera.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { debug, Game } from "../Game/Game.js";
import { AfterNFrames, OnFrame } from "../GameEvent/FrameEvent.js";
import { GameEvent } from "../GameEvent/GameEvent.js";
import { Background } from "../Sprite/Background.js";
import { Kris } from "../Sprite/Kris.js";
import { Rail } from "../Sprite/Rail.js";
import { TextBox } from "../Sprite/TextBox.js";
import { Scene } from "./Scene.js";

export class OverworldScene extends Scene 
{
    private readonly rails: Rail[] = [];
    public readonly player = new Kris();
    private textQueue: TextBox[] = [];
    private playingMusic: SoundFile = ResourceManager.getSound("assets/mus/spamton_basement.ogg");
    init()
    {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                this.rails.push(new Rail(320 * i, 90 + 30 * j));
            }
        }
        // Game.AddEvent(
        //     // Spamton mock encounter
        //     new GameEvent(
        //         () => {
        //             return this.player.x < 180
        //         },
        //         () => {
        //             this.player.canMove = false;
        //         }
                
        //     )
        // )
        if (!debug)
        {
            this.playingMusic.loop();
            this.playingMusic.play();
        }
        Game.AddEvent(
            AfterNFrames(4, () => this.QueueText(
                "* Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter    Deich."
                )
            )
        )
    }

    private scroll(): void
    {
        // return;
        const scrollAmount = this.player.makeMove()[0]; // Get x value from player movement

        if (this.player.x > 120 && this.player.x < 510)
            this.camera.x += scrollAmount;
    }
    
    update() 
    {
        background(0);
        
        this.scroll();
        Background.draw();
        for (let rail of this.rails)
        {
            rail.draw();
        }
        this.player.update();
        this.player.draw();

        // Draw any active textboxes
        const textbox = this.textQueue[0];
        if (textbox)
        {
            textbox.update();
            textbox.draw();
            if (textbox.IsComplete())
            {
                this.textQueue.splice(0, 1);
                if (this.textQueue.length === 0)
                    this.player.canMove = true;
            }
        }
    }

    public QueueText(...texts: string[])
    {
        this.player.canMove = false;
        for (const str of texts)
        {
            this.textQueue.push(new TextBox(str));
        }
    }
}