import Brick from "./class/Brick";
import Environment from "./class/Environment";
import { convertOGL, hexToRGB } from "./util/color";

export default async function(bricks: Brick[], env: Environment) {
    let data = "B R I C K  W O R K S H O P  V0.2.0.0\n\n"

    const ambient = hexToRGB(env.ambient)
    data += convertOGL(ambient.r, ambient.g, ambient.b).join(" ") + "\n"

    const baseColor = hexToRGB(env.baseColor)
    data += convertOGL(baseColor.r, baseColor.g, baseColor.b) + "\n"

    const skyColor = hexToRGB(env.skyColor)
    data += convertOGL(skyColor.r, skyColor.g, skyColor.b) + "\n"

    data += env.baseSize + "\n"
    data += env.sunIntensity + "\n\n"

    for (const brick of bricks) {
        // Position and Scale
        data += brick.position.join(" ") + " "
        data += brick.scale.join(" ") + " "

        // Color
        const RGB = hexToRGB(brick.color)
        console.log(RGB)
        data += convertOGL(RGB.r, RGB.g, RGB.b).join(" ") + " "
    
        data += brick.visibility + "\n"

        if(brick.name) data += '	+NAME ' + brick.name + "\n"
        if(brick.rotation !== 0) data += '	+ROT ' + brick.rotation + "\n"
        if(brick.shape !== "brick") data += '	+SHAPE ' + brick.shape + "\n"
        if(brick.model !== 0) data += '	+MODEL ' + brick.model + "\n"
        if(!brick.collision) data += '	+NOCOLLISION\n'
        if(brick.lightEnabled == true) {
            const RGB = hexToRGB(brick.lightColor)
            data += '	+LIGHTCOLOR ' + convertOGL(RGB.r, RGB.g, RGB.b).join(" ") + "" + brick.lightRange + "\n"
        }
    }

    return data
}