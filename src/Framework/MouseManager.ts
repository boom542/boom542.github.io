export class MouseManager 
{
    static previousPos: number[] = [];
    static currentPos: number[] = [];
    static previouslyHeld: boolean = false;
    static currentlyHeld: boolean = false;
    static pressLocation: number[] = [];
    static releaseLocation: number[] = [];

    static update()
    {
        // This function should be called at the beginning of each loop to ensure it tracks keys properly
        MouseManager.previousPos = MouseManager.currentPos;
        MouseManager.currentPos = [mouseX, mouseY];
        
        if (!MouseManager.previouslyHeld && MouseManager.currentPos)
            MouseManager.pressLocation = [mouseX, mouseY];
        else if (MouseManager.previouslyHeld && !MouseManager.currentlyHeld)
            MouseManager.releaseLocation = [mouseX, mouseY]; 

        MouseManager.previouslyHeld = MouseManager.currentlyHeld;
        MouseManager.currentlyHeld = mouseIsPressed;

    }

    static MouseIsDown(): boolean
    {
        return MouseManager.currentlyHeld;
    }

    static MousePressed(): boolean
    {
        return !MouseManager.previouslyHeld && MouseManager.currentlyHeld;
    }

    static MouseReleased(): boolean
    {
        return MouseManager.previouslyHeld && !MouseManager.currentlyHeld;
    }

    static PressLocation(): number[]
    {
        return MouseManager.pressLocation;
    }

    static ReleaseLocation(): number[]
    {
        return MouseManager.releaseLocation;
    }
}