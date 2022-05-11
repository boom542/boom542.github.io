import { Keys } from "../Framework/Enumarable/Keys.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { LanguageSelectScene } from "../Scene/LanguageSelectScene.js";
import { OverworldScene } from "../Scene/OverworldScene.js";

export abstract class Sketch {

    static preload(): void 
    {
        // This function was generated automatically. Please do not edit manually.
        ResourceManager.getSprite("assets/spr/krisd_2.png");
        ResourceManager.getSprite("assets/spr/krisd_0.png");
        ResourceManager.getSprite("assets/spr/textbox_topleft_5.png");
        ResourceManager.getSprite("assets/spr/krisu_0.png");
        ResourceManager.getSprite("assets/spr/krisu_1.png");
        ResourceManager.getSprite("assets/spr/sneo_track.png");
        ResourceManager.getSprite("assets/spr/kris_fall.png");
        ResourceManager.getSprite("assets/spr/basement.png");
        ResourceManager.getSprite("assets/spr/krisr_0.png");
        ResourceManager.getSprite("assets/spr/krisl_2.png");
        ResourceManager.getSprite("assets/spr/font.png");
        ResourceManager.getSprite("assets/spr/flag-jp.png");
        ResourceManager.getSprite("assets/spr/textbox_topleft_6.png");
        ResourceManager.getSprite("assets/spr/krisl_1.png");
        ResourceManager.getSprite("assets/spr/flag-us.png");
        ResourceManager.getSprite("assets/spr/textbox_topleft_4.png");
        ResourceManager.getSprite("assets/spr/textbox_topleft_3.png");
        ResourceManager.getSprite("assets/spr/flag-gb-unused.png");
        ResourceManager.getSprite("assets/spr/krisu_2.png");
        ResourceManager.getSprite("assets/spr/krisl_0.png");
        ResourceManager.getSprite("assets/spr/textbox_topleft_1.png");
        ResourceManager.getSprite("assets/spr/textbox_topleft_0.png");
        ResourceManager.getSprite("assets/spr/krisd_1.png");
        ResourceManager.getSprite("assets/spr/krisr_2.png");
        ResourceManager.getSprite("assets/spr/textbox_topleft_2.png");
        ResourceManager.getSprite("assets/spr/textbox_topleft_7.png");
        ResourceManager.getSprite("assets/spr/krisr_1.png");
        ResourceManager.getSound("assets/mus/spamton_basement.ogg");
        ResourceManager.getSound("assets/mus/spamton_neo_mix_ex_wip.ogg");
        ResourceManager.getSound("assets/mus/spamton_neo_meeting.ogg");
        ResourceManager.getSound("assets/sfx/textspam.wav");
        ResourceManager.getSound("assets/sfx/spamton_meeting_intro.ogg");
        ResourceManager.getSound("assets/sfx/spamton_meeting.ogg");
        ResourceManager.getSound("assets/sfx/spamton_house.ogg");
        ResourceManager.getSound("assets/sfx/textspam2.wav");
        ResourceManager.getSound("assets/sfx/spamton_happy.ogg");
        ResourceManager.getSound("assets/sfx/textral.wav");
        ResourceManager.getSound("assets/sfx/spamton_neo_meeting.ogg");
        ResourceManager.getSound("assets/sfx/textsus.wav");
        ResourceManager.getSound("assets/sfx/spamton_laugh_noise.ogg");
        ResourceManager.getSound("assets/sfx/text.wav");
        ResourceManager.getFont("assets/font/ja_main.woff");
        ResourceManager.getFont("assets/font/en_main.otf");
    }

    static setup(): void 
    {
        Game.ChangeScene(new LanguageSelectScene());
        createCanvas(320 * Game.resolution, 240 * Game.resolution);
        frameRate(30);
    }

    static draw(): void 
    {
        noSmooth();
        Game.Update();
    }

    static keyPressed(): void
    {

    }


}