export function samePlane(p1,p2) {
    if (p1 === p2) return true;
    if (!p1 || !p2) return false;
    
    return parseFloat(p1.left)===parseFloat(p2.left) &&
        parseFloat(p1.top)===parseFloat(p2.top) &&
        parseFloat(p1.width)===parseFloat(p2.width) &&
        parseFloat(p1.height)===parseFloat(p2.height)
}

export function planeToScreen(width,height,drawn,rect) {
    const x = (rect.left - drawn.left) * width / drawn.width
    const y = (rect.top - drawn.top) * height / drawn.height
    const w = rect.width * width / drawn.width;
    const h = rect.height * height / drawn.height;
    return {
        left:x,
        top:y,
        width:w,
        height:h
    }
}

export function screenToPlane(width,height,drawn,rect) {
    const x = rect.left * drawn.width / width  + drawn.left;
    const y = rect.top * drawn.height / height  + drawn.top;
    const w = rect.width * drawn.width / width;
    const h = rect.height * drawn.height / height;

    return {
        left:x,
        top:y,
        width:w,
        height:h
    }

}

export function parsePlane(plane) {
    return {
        left:parseFloat(plane.left),
        top:parseFloat(plane.top),
        width:parseFloat(plane.width),
        height:parseFloat(plane.height)
    }
}
