import Vector3 from "./Vector3"

export default class Brick {
    /** The name of the brick. */
    name: string = ''

    /** The current color of the brick. */
    color: string

    /** The current position of the brick. */
    position: Vector3

    /** The current scale of the brick. */
    scale: Vector3

    /** The visibility of the brick. (1 = fully visible, 0 = invisible)*/
    visibility: number = 0

    /** If the brick is passable by other players. */
    collision: boolean = true

    /** If enabled, the brick will emit lighting. */
    lightEnabled: boolean = false

    /** The current light color (in hex) of the brick. */
    lightColor: string = "#000000"

    /** The range of the brick's lighting. */
    lightRange: number = 5
    
    /** The current rotation of the brick (must be % 90). */
    rotation: number = 0

    /** The asset id the brick will appear as. */
    model: number = 0

    /** The shape of the brick. */
    shape: string = "brick"

    constructor(position = new Vector3(0, 0, 0), scale = new Vector3(1, 1, 1), color = "#C0C0C0") {
        this.position = position
        this.scale = scale
        this.color = color
        this.visibility = 1
        this.collision = true
    }
}
