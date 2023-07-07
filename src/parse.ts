import Brick from "./class/Brick";
import Vector3 from "./class/Vector3";
import Tool from "./class/Tool";
import Team from "./class/Team";
import Environment from './class/Environment'

import { convertRGB, rgbToHex } from "./util/color";
import fs, { PathLike } from 'node:fs';

export function parseBrk(data: String) {
    const LINES = data.split("\n")

    let totalLines = 0

    const bricks = [] as Brick[]
    const spawns = [] as Brick[]
    const tools = [] as Tool[]
    const teams = [] as Team[]
    const environment = {
        ambient: "#ffffff",
        skyColor: "#ffffff",
        baseColor: "#ffffff",
        baseSize: 100,
        sunIntensity: 300
    } as Environment

    let currentBrick = -1
    let scriptWarning = false // Doesn't load scripts, just notifies if the .brk contains scripts

        for (let line of LINES) {
            totalLines++
            line = line.trim()
            console.log(totalLines)

            // Set up environment details
            switch (totalLines) {
                case 3: {
                    const glColor = line.split(" ")
                    const RGB = convertRGB(glColor[0], glColor[1], glColor[2])
                    environment["ambient"] = rgbToHex(RGB[2], RGB[1], RGB[0])
                    continue
                }
                case 4: {
                    const glColor = line.split(" ")
                    const RGB = convertRGB(glColor[0], glColor[1], glColor[2])
                    environment["baseColor"] = rgbToHex(RGB[2], RGB[1], RGB[0])
                    continue
                }
                case 5: { // This isn't BGR because ... ?
                    const glColor = line.split(" ") as string[]
                    const RGB = convertRGB(glColor[0], glColor[1], glColor[2])
                    environment["skyColor"] = rgbToHex(RGB[0], RGB[1], RGB[2])
                    continue
                }
                case 6: {
                    environment["baseSize"] = Number(line)
                    continue
                }
                case 7: {
                    environment["sunIntensity"] = Number(line)
                    continue
                }
            }

            const DATA = line.split(" ")

            if(!DATA[0]) continue

            const ATTRIBUTE = DATA[0].replace("+", "")
            const VALUE = DATA.slice(1).join(" ")

            const cB = bricks[currentBrick] as Brick;

            switch (ATTRIBUTE) {
                case "NAME": {
                    cB.name = VALUE
                    continue
                }
                case "ROT": {
                    cB.rotation = Number(VALUE)
                    continue
                }
                case "SHAPE": {
                    cB.shape = VALUE
                    if (VALUE === "spawnpoint") spawns.push(cB)
                    continue
                }
                case "MODEL": {
                    cB.model = Number(VALUE)
                    continue
                }
                case "NOCOLLISION": {
                    cB.collision = false
                    continue
                }
                case "COLOR": {
                    const colors = VALUE.split(" ")
                    const color = convertRGB(colors[0], colors[1], colors[2])
                    const team: Team = new Team(
                        String(teams[teams.length - 1]), 
                        rgbToHex(
                            color[0]!, 
                            color[1]!,
                            color[2]!
                        )
                    )
                    teams[teams.length - 1] = team
                    continue
                }
                case "LIGHT": {
                    const colors = VALUE.split(' ')
                    const lightRange = parseInt(colors[3]!)
                    const RGB = convertRGB(colors[0], colors[1], colors[2])
                    cB.lightEnabled = true
                    cB.lightRange = lightRange
                    cB.lightColor = rgbToHex(RGB[0], RGB[1], RGB[2])
                    continue
                }
                case "SCRIPT": {
                    if (scriptWarning) continue
                    scriptWarning = true
                    console.warn("WARNING: This set contains scripts. Scripts are incompatible with node-hill so they will not be loaded.")
                    continue
                }
            }

            if (DATA.length === 10) {
                const RGB = convertRGB(DATA[6], DATA[7], DATA[8]), // Convert to OpenGL colour format
                    xPos    = Number(DATA[0]),
                    yPos    = Number(DATA[1]),
                    zPos    = Number(DATA[2]),
                    xScale  = Number(DATA[3]),
                    yScale  = Number(DATA[4]),
                    zScale  = Number(DATA[5]),
                    color   = rgbToHex(
                        RGB[0], 
                        RGB[1],
                        RGB[2]
                    ),
                    transparency   = Number(DATA[9])
                    
                const newBrick = new Brick(
                    new Vector3(xPos, yPos, zPos), 
                    new Vector3(xScale, yScale, zScale),
                    color
                )

                newBrick.visibility = transparency

                bricks.push(newBrick)
                console.log('pushed new brick: ' + newBrick.name)

                currentBrick++
            }

            if (DATA[0] && DATA[0] === ">TEAM")
                teams.push(new Team(VALUE))

            if (DATA[0] && DATA[0] === ">SLOT")
                tools.push(new Tool(VALUE))
        }

    return { 
        teams: teams, 
        tools: tools, 
        bricks: bricks, 
        environment: environment, 
        spawns: spawns 
    }
}

export async function loadFile(dir: PathLike) {
    const FILE = await fs.promises.readFile(dir, {
        encoding: "utf-8"
    });
    const parsedData = await parseBrk(FILE)
    return parsedData
}
