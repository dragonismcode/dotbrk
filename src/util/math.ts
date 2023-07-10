import Brick from "../class/Brick";

export function generatePoints(cx: number, cy: number, vx: number, vy: number, rotatedAngle: number) { 
        rotatedAngle = rotatedAngle * Math.PI / 180;

        let dx = vx - cx;
        let dy = vy - cy;

        let distance = Math.sqrt(dx * dx + dy * dy);
        let originalAngle = Math.atan2(dy,dx);

        let rotatedX = cx + distance * Math.cos(originalAngle + rotatedAngle);
        let rotatedY = cy + distance * Math.sin(originalAngle + rotatedAngle);
    
        return {
            x: rotatedX,
            y: rotatedY
        }
}

export function rotateCords(square: Brick, a: "x" | "y" | "z", b: "x" | "y" | "z") {
    let centerA = square.position[a] + (square.scale[a] / 2);
    let centerB = square.position[b] + (square.scale[b] / 2);
    //Work out the new locations

    let topLeft = generatePoints(centerA, centerB, square.position[a], square.position[b], square.rotation),
    topRight = generatePoints(centerA, centerB, square.position[a] + square.scale[a], square.position[b], square.rotation),
    bottomLeft = generatePoints(centerA, centerB, square.position[a], square.position[b] + square.scale[b], square.rotation),
    bottomRight = generatePoints(centerA, centerB, square.position[a] + square.scale[a], square.position[b] + square.scale[b], square.rotation);

    return{
        tl: topLeft,
        tr: topRight,
        bl: bottomLeft,
        br: bottomRight
    }
}

// sat algorithm for 2d collision detection
export function checkCollision(square1: Brick, square2: Brick, axis: "x" | "y" | "z", axis2: "x" | "y" | "z") {
    let a = rotateCords(square1, axis, axis2);
    let b = rotateCords(square2, axis, axis2);

    let ax = [a.tl.x, a.tr.x, a.br.x, a.bl.x];
    let ay = [a.tl.y, a.tr.y, a.br.y, a.bl.y];
    let bx = [b.tl.x, b.tr.x, b.br.x, b.bl.x];
    let by = [b.tl.y, b.tr.y, b.br.y, b.bl.y];

    for (let i = 0; i < 4; i++) {
        let j = (i + 1) % 4;
        let normal = {
            x: ay[i] - ay[j],
            y: ax[j] - ax[i]
        }

        let minA = Infinity;
        let maxA = -Infinity;

        for (let k = 0; k < 4; k++) {
            let projected = normal.x * ax[k] + normal.y * ay[k];
            if (projected < minA) {
                minA = projected;
            }
            if (projected > maxA) {
                maxA = projected;
            }
        }

        let minB = Infinity;
        let maxB = -Infinity;

        for (let k = 0; k < 4; k++) {
            let projected = normal.x * bx[k] + normal.y * by[k];
            if (projected < minB) {
                minB = projected;
            }
            if (projected > maxB) {
                maxB = projected;
            }
        }

        if (maxA < minB || maxB < minA) {
            return false;
        }
    }

    return true;
}

// check collision for all 3 axis
export function checkCollision3d(square1: Brick, square2: Brick) {
    var xy = checkCollision(square1, square2, "x", "y");
    var xz = checkCollision(square1, square2, "x", "z");
    var yz = checkCollision(square1, square2, "y", "z");

    if(xy && xz && yz) {
        return true;
    }
    
    return false;
}