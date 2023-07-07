export default class Team {
    readonly name: string
    readonly color: string


    constructor(name: string, color = "#ffffff") {
        this.name = name
        this.color = color
    }
}