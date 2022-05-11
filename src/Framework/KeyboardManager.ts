export class KeyboardManager 
{
    static previous: number[] = [];
    static current: number[] = [];

    static update()
    {
        // This function should be called at the beginning of each loop to ensure it tracks keys properly
        for (let key = 0; key < 250; key++)
        {
            KeyboardManager.previous[key] = KeyboardManager.current[key];
            if (keyIsDown(key))
                KeyboardManager.current[key]++;
            else
                KeyboardManager.current[key] = 0;
            
        }
    }

    static KeyIsPressed(keyCode: number): boolean
    {
        // Returns true if the key has just now been pressed on the current frame, but was not the previous frame.
        return KeyboardManager.current[keyCode] === 1;
    }
    static KeyIsHeld(keyCode: number): boolean
    {
        // Returns true if the key has been pressed for 1 or more frames.
        return KeyboardManager.current[keyCode] >= 1;
    }
    
    static KeyIsReleased(keyCode: number): boolean
    {
        // Returns true if the key was just now released on the current frame, but was down on the previous frame.
        return KeyboardManager.previous[keyCode] >= 1 && KeyboardManager.current[keyCode] === 0;
    }

    static KeyHoldDuration(keyCode: number): number 
    {
        // Returns the number of frames the given key has been held for.
        return KeyboardManager.current[keyCode];
    }
}