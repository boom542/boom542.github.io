export class GameEvent
{
    /*
        Represents a game event, i.e. some action that occurs after a given predicate is met.
        Once the condition is met, the action can be executed.
        This is used to schedule events that occur given common types of conditiions,
        e.g. after a certain number of frames, after a certain animation has completed, etc.

    */

    protected condition: CallableFunction;
    protected payload: CallableFunction;
    protected complete: boolean;

    constructor(condition: CallableFunction, payload: CallableFunction)
    {
        this.condition = condition;
        this.payload = payload;
        this.complete = false;
    }

    public run(): void 
    {
        if (this.condition() && !this.complete) 
        {
            this.payload();
            this.complete = true;
        }
    }

    public IsComplete(): boolean 
    {
        return this.complete;
    }

}