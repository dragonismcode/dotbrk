export default class Tool {
    readonly name: string

    /** The assetId of the tool's model. */
    model = 0

    constructor(name: string) {
        this.name = name
        this.model = 0
    }
}