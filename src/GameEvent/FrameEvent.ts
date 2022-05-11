import { Game } from "../Game/Game.js";
import { GameEvent } from "./GameEvent.js";

export { OnFrame, AfterNFrames, NextFrame, FrameEvent }

class FrameEvent extends GameEvent
{
    /*
        An event that occurs a set number of frames after it is instantiated.

    */

    constructor(executeOnFrame: number, payload: CallableFunction)
    {
        super(
            () => 
            {
                return Game.GetFrameCount() >= executeOnFrame
            },
            payload
        );
    }
}

function OnFrame(n: number, payload: CallableFunction) 
{
    return new FrameEvent(n, payload);
}

function AfterNFrames(n: number, payload: CallableFunction) 
{
    return new FrameEvent(n + Game.GetFrameCount(), payload);
}

function NextFrame(payload: CallableFunction)
{
    return new FrameEvent(1 + Game.GetFrameCount(), payload);
}