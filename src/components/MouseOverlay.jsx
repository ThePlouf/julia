import React from 'react';
import SelectionRectangle from './SelectionRectangle'

function planeToScreen(width,height,drawn,rect) {
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

function screenToPlane(width,height,drawn,rect) {
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

function toNum(plane) {
    return {
        left:parseFloat(plane.left),
        top:parseFloat(plane.top),
        width:parseFloat(plane.width),
        height:parseFloat(plane.height)
    }
}


export default function MouseOverlay({width,height,drawing,drawnPlane,selectedPlane,onSelectedPlaneChanged=()=>{},onReset,onDraw}) {
    const drawnPlaneNum = toNum(drawnPlane);
    const selectedPlaneNum = toNum(selectedPlane);

    const onSelectionChange = (x,y,w,h) => {
        const plane = screenToPlane(width,height,drawnPlaneNum,{left:x,top:y,width:w,height:h});
        onSelectedPlaneChanged(plane);
    }

    const selectionOnScreen = planeToScreen(width,height,drawnPlaneNum,selectedPlaneNum);
    return <SelectionRectangle
        left={selectionOnScreen.left}
        top={selectionOnScreen.top}
        width={selectionOnScreen.width}
        height={selectionOnScreen.height}
        onSelectionChange={onSelectionChange}
        >

    </SelectionRectangle>
}
