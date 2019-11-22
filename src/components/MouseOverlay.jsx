import React, {useState} from 'react';
import SelectionRectangle from './SelectionRectangle'

function AutoSelection() {
    const [rect,setRect]=useState({x:50,y:50,w:200,h:200});
    const change=(x,y,w,h)=>{
        setRect({x:x,y:y,w:w,h:h});
    }
    return <SelectionRectangle left={rect.x} top={rect.y} width={rect.w} height={rect.h} onSelectionChange={change}></SelectionRectangle>
}

export default function MouseOverlay({width,height,drawing,drawnPlane,selectedPlane,onSelectedPlaneChanged,onReset,onDraw}) {
    return <AutoSelection></AutoSelection>

}
