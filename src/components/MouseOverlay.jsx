import React, {useState,useRef} from 'react';
import SelectionRectangle from './SelectionRectangle'
import * as Utils from '../fractal-utils.mjs'

export default function MouseOverlay({width,height,drawnPlane,selectedPlane,onSelectedPlaneChanged=()=>{},onReset=()=>{},onDraw=()=>{}}) {
    const mainDiv = useRef(null);
    const [mouseDown,setMouseDown] = useState(false);
    const [initialPos,setInitialPos] = useState({x:0,y:0});
    const [currentPos,setCurrentPos] = useState({x:0,y:0});

    const drawnPlaneNum = Utils.parsePlane(drawnPlane);
    const selectedPlaneNum = Utils.parsePlane(selectedPlane);

    const selectionBounds = () => {
        let x = initialPos.x;
        let y = initialPos.y;
        let w = currentPos.x - initialPos.x - 1;
        let h = currentPos.y - initialPos.y - 1;

        if(w < 0) {
            x = x + w;
            w = - w;
        }

        if(h < 0) {
            y = y + h;
            h = - h;
        }

        if(w < 2 || h < 2) return {left:0,top:0,width:0,height:0,value:false};
        return {
            left:x,
            top:y,
            width:w,
            height:h,
            valid:true
        };
    }

    const onSelectionChange = (x,y,w,h) => {
        const plane = Utils.screenToPlane(width,height,drawnPlaneNum,{left:x,top:y,width:w,height:h});
        onSelectedPlaneChanged(plane);
    }

    const down = e => {
        if(!isSame) {
            if(e.nativeEvent.target === mainDiv.current) {
                onReset();
                //Proceed, don't return here
            } else {
                return;
            }
        }
        setMouseDown(true);
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setInitialPos({x:x,y:y});
        setCurrentPos({x:x,y:y});
        mainDiv.current.setPointerCapture(e.pointerId);
    };

    const up = e => {
        if(!isSame) return;
        if(!mouseDown) return;
        setMouseDown(false);
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setCurrentPos({x:x,y:y});
        mainDiv.current.releasePointerCapture(e.pointerId);
        const bounds = selectionBounds();
        if(bounds.valid) {
            const selection = Utils.screenToPlane(width,height,drawnPlaneNum,bounds);
            onSelectedPlaneChanged(selection);
        }

    };

    const move = e => {
        if(!mouseDown) return;
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setCurrentPos({x:x,y:y});
    };

    const selectionOnScreen = Utils.planeToScreen(width,height,drawnPlaneNum,selectedPlaneNum);
    const isSame=Utils.samePlane(drawnPlaneNum,selectedPlaneNum);
    const bounds = selectionBounds();
    return <div
            ref={mainDiv}
            style={{left:"1px",top:"1px",position:"absolute",width:width+"px",height:height+"px",mixBlendMode:"difference"}}
            onPointerDown={down}
            onPointerUp={up}
            onPointerMove={move}
            onLostPointerCapture={up}

            >
        <div
            
            style={{left:bounds.left+"px",
                top:bounds.top+"px",
                width:bounds.width+"px",
                height:bounds.height+"px",
                border:"1px solid white",
                position:"absolute",
                display:mouseDown&&bounds.valid?null:"none"}}
            >

        </div>
        <div style={{display:isSame?"none":null}}>
            <SelectionRectangle
                left={selectionOnScreen.left}
                top={selectionOnScreen.top}
                width={selectionOnScreen.width}
                height={selectionOnScreen.height}
                onSelectionChange={onSelectionChange}
                onAction={onDraw}
                >
            </SelectionRectangle>
        </div>
    </div>
}
