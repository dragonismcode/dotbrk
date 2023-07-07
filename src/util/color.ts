// Convert RGB to hex
export function rgbToHex(r: number = 0, g: number = 0, b: number = 0): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export function rgbToBgr(rgb: string): string {
    return rgb.substring(4, 6) + rgb.substring(2, 4) + rgb.substring(0, 2)
}

// Convert RGB to decimal
export function rgbToDec(r: number, g: number, b: number): string {
    const rgb = r | (g << 8) | (b << 16)
    return rgb.toString(10)
}

export function randomHexColor(): string {
    return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6)
}

// Convert hex to decimal
export function hexToDec(hex: string, bgr = false): string {
    hex = hex.replace(/^#/, "")
    const rgb = hexToRGB(hex)
    if (!bgr) {
        return rgbToDec(rgb.r!, rgb.g!, rgb.b!)
    } else {
        return rgbToDec(rgb.b!, rgb.g!, rgb.r!)
    }
}

// Convert hex to RGB
export function hexToRGB(hex: string): { r: number, g: number, b: number } {
    hex = hex.replace(/^#/, "")
    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return {
        r,
        g,
        b
    }
}

// Converts RGB from OpenGL format to proper format (e.g. [0, 0, 1] => [0, 0, 255])
export function convertRGB(r: number | string = 0, g: number | string = 0, b: number | string = 0): number[] {
    r = Number(r)
    g = Number(g)
    b = Number(b)
    r *= 255, g *= 255, b *= 255
    return [r, g, b]
}

// Converted OpenGL colour format to RGB (e.g. [0, 0, 255] => [0, 0, 1])
export function convertOGL(r: number | string = 0, g: number | string = 0, b: number | string = 0, round: boolean = true, roundTo: number = 8): number[] {
    r = Number(r)
    g = Number(g)
    b = Number(b)
    r /= 255, g /= 255, b /= 255
    if (round) r = parseFloat(r.toFixed(roundTo)), g = parseFloat(g.toFixed(roundTo)), b = parseFloat(b.toFixed(roundTo))
    return [r, g, b]
}