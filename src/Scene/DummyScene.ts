import { Scene } from "./Scene.js";

export class DummyScene extends Scene {
    /* 
    A Scene object that simply serves as an object of type "Scene"
    so that TypeScript doesn't complain that the game instance
    scene is undefined, even though I immediately activate
    a legitimate scene in the sketch setup method.
    This is admittedly a somewhat embarrassing hack,
    but I have had it up to here with TypeScript-related
    goofs ironically hindering the speed of development...
    Any abstraction that "just works" is best!
    (at least, in this case :x)
    */
    public init() {}
    public update() {}
    
}