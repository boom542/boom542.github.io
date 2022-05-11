import { FacingDirection } from "../Framework/Enumarable/FacingDirection.js";
import { imageScaled } from "../Framework/Extensions.js";
import { KeyboardManager } from "../Framework/KeyboardManager.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { Sprite } from "./Sprite.js";

export class Kris extends Sprite {

    public x: number;
    public y: number;
    public canMove: boolean;
    private facing: FacingDirection;
    private walkPhase: number;
    private walkAnimationTimer: number;
    private static readonly BASE_SPEED = 2; // Initial speed without holding shift
    private static readonly RUN_SPEED = 3; // Speed after holding shift
    private static readonly SPRINT_SPEED = 3.5; // Speed after holding shift for 10 frames (1/3 second)
    private static readonly MAX_SPEED = 4; // Speed after holding shift for 60 frames (2 seconds)
    private static readonly WALK_FRAMES = 6; // Number of frames before the walking animation changes
    private static readonly WALK_FRAMES_SPRINT = 4; // Same as above, but applied when sprinting


    constructor() 
    {
        super();
        this.x = 160;
        this.y = 100;
        this.canMove = true;
        this.facing = FacingDirection.UP;
        this.walkPhase = 0;
        this.walkAnimationTimer = 0;
    }

    getMoveSpeed() 
    {
        if (!this.canMove) return 0;
        let moveSpeed = Kris.BASE_SPEED;
        if (KeyboardManager.KeyHoldDuration(SHIFT) >= 60)
            moveSpeed = Kris.MAX_SPEED
        else if (KeyboardManager.KeyHoldDuration(SHIFT) >= 10)
            moveSpeed =  Kris.SPRINT_SPEED;
        else if (KeyboardManager.KeyIsHeld(SHIFT))
            moveSpeed = Kris.RUN_SPEED;
        return moveSpeed;
    }

    public makeMove(): number[]
    {
        /* This method is also used by the OverworldScene to determine
           whether the screen should scroll when the player reaches the wall.
           Returns a vector consisting of [dx, dy], which is the amount by
           which the player should move the current frame.
        */
        const moveSpeed = this.getMoveSpeed();
        let dx: number = 0;
        let dy: number = 0;

        if (KeyboardManager.KeyIsHeld(RIGHT_ARROW)) {
            dx = moveSpeed;
            if (this.x + dx > 620)
                // If the base speed is within bounds but the sprint is not, then move by the base speed instead. 
                dx = (this.x + Kris.BASE_SPEED > 620) ? 0 : Kris.BASE_SPEED;
        } else if (KeyboardManager.KeyIsHeld(LEFT_ARROW)) {
            dx = -moveSpeed;
            if (this.x + dx < 0)
                dx = (this.x - Kris.BASE_SPEED < 0) ? 0 : -Kris.BASE_SPEED;
        }

        if (KeyboardManager.KeyIsHeld(UP_ARROW)) {
            dy = -moveSpeed;
            if (this.y + dy < 80)
                dy = (this.y - Kris.BASE_SPEED < 80) ? 0 : -Kris.BASE_SPEED;
        } else if (KeyboardManager.KeyIsHeld(DOWN_ARROW)) {
            dy = moveSpeed;
            if (this.y + dy > 160)
                dy = (this.y + Kris.BASE_SPEED > 160) ? 0 : Kris.BASE_SPEED;
        }

        return [dx, dy];
    }

    private orientate(): void
    {
        if (!this.canMove)
            return;
        // Updates the player's direction and animation frame.
        const movement = this.makeMove();

        // Basic movements
        if (KeyboardManager.KeyIsHeld(RIGHT_ARROW) && movement[1] === 0)
            this.facing = FacingDirection.RIGHT
        else if (KeyboardManager.KeyIsHeld(LEFT_ARROW) && movement[1] === 0)
            this.facing = FacingDirection.LEFT

        if (KeyboardManager.KeyIsHeld(UP_ARROW) && movement[0] === 0)
            this.facing = FacingDirection.UP;
        else if (KeyboardManager.KeyIsHeld(DOWN_ARROW) && movement[0] === 0)
            this.facing = FacingDirection.DOWN;

        // Backwardness correction (prevents you from moving backwards)
        if (this.facing === FacingDirection.RIGHT && movement[0] < 0)
            this.facing = FacingDirection.LEFT;
        if (this.facing === FacingDirection.LEFT && movement[0] > 0)
            this.facing = FacingDirection.RIGHT;
        if (this.facing === FacingDirection.DOWN && movement[1] < 0)
            this.facing = FacingDirection.UP;
        if (this.facing === FacingDirection.UP && movement[1] > 0)
            this.facing = FacingDirection.DOWN;

    }

    private walkAnimation(): void 
    {
        const movement = this.makeMove();
        this.walkAnimationTimer++;
        const animationThreshold = (KeyboardManager.KeyIsHeld(SHIFT)) ? Kris.WALK_FRAMES_SPRINT : Kris.WALK_FRAMES;
        if (this.walkAnimationTimer >= animationThreshold) 
        {
            this.walkAnimationTimer = 0;
            if (movement[0] === 0 && movement[1] === 0) // Idle
                this.walkPhase = 0;
            else
                this.walkPhase = (this.walkPhase + 1) % 4;
        }

    }

    update()
    {
        this.orientate();
        this.walkAnimation();
        const movement = this.makeMove();
        this.x += movement[0];
        this.y += movement[1];
    }

    draw()
    {


        const spriteNumber = [0, 1, 0, 2][this.walkPhase];

        imageScaled(
            ResourceManager.getSprite("assets/spr/kris" + this.facing + "_" + spriteNumber + ".png"),
            ...this.screenPosition()
        )
    }
}