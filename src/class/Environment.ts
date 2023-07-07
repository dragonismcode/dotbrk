export default class Team {
    ambient: string
    skyColor: string
    baseColor: string
    baseSize: number
    sunIntensity: number

    constructor(ambient: string, skyColor: string, baseColor: string, baseSize: number, sunIntensity: number) {
        this.ambient = ambient
        this.skyColor = skyColor
        this.baseColor = baseColor
        this.baseSize = baseSize
        this.sunIntensity = sunIntensity
    }
}