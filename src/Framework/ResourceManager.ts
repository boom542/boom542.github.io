import * as p5 from "p5";

export class ResourceManager
{
    private static sprites = new Map<string, p5.Image>();
    private static fonts = new Map<string, p5.Font>();
    private static sounds = new Map<string, p5.SoundFile>();
    private static langs = new Map<string, Object>();

    static getSprite(resourceName: string): p5.Image
    {
        if (!ResourceManager.sprites.has(resourceName))
            try 
            {
                ResourceManager.sprites.set(resourceName, loadImage(resourceName));
            } catch
            {
                throw Error(`File not found on filesystem: ${resourceName}`);
            }

        return ResourceManager.sprites.get(resourceName)!;
    }

    static getFont(resourceName: string): p5.Font 
    {
        if (!ResourceManager.fonts.has(resourceName))
            try 
            {
                ResourceManager.fonts.set(resourceName, loadFont(resourceName));
            } catch
            {
                throw Error(`File not found on filesystem: ${resourceName}`);
            }

        return ResourceManager.fonts.get(resourceName)!;
    }

    static getSound(resourceName: string): p5.SoundFile 
    {
        if (!ResourceManager.sounds.has(resourceName))
            try 
            {
                ResourceManager.sounds.set(resourceName, loadSound(resourceName));
            } catch
            {
                throw Error(`File not found on filesystem: ${resourceName}`);
            }

        return ResourceManager.sounds.get(resourceName)!;
    }

    static getLanguage(languageCode: string): Object 
    {
        const resourceName = `assets/lang/${languageCode}.json`;
        if (!ResourceManager.langs.has(resourceName))
            try 
            {
                ResourceManager.langs.set(resourceName, loadJSON(resourceName));
            } catch
            {
                throw Error(`File not found on filesystem: ${resourceName}`);
            }

        return ResourceManager.langs.get(resourceName)!;
    }}