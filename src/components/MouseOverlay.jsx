import React, {useState,useRef} from 'react';
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

function same(p1,p2) {
    return p1.left === p2.left && p1.top === p2.top && p1.width === p2.width && p1.height === p2.height;
}

export default function MouseOverlay({width,height,drawing,drawnPlane,selectedPlane,onSelectedPlaneChanged=()=>{},onReset=()=>{},onDraw=()=>{}}) {
    const mainDiv = useRef(null);
    const [mouseDown,setMouseDown] = useState(false);
    const [initialPos,setInitialPos] = useState({x:0,y:0});
    const [currentPos,setCurrentPos] = useState({x:0,y:0});

    const drawnPlaneNum = toNum(drawnPlane);
    const selectedPlaneNum = toNum(selectedPlane);

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
        const plane = screenToPlane(width,height,drawnPlaneNum,{left:x,top:y,width:w,height:h});
        onSelectedPlaneChanged(plane);
    }

    const down = e => {
        if(drawing) return;
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
        if(drawing) return;
        if(!isSame) return;
        if(!mouseDown) return;
        setMouseDown(false);
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setCurrentPos({x:x,y:y});
        mainDiv.current.releasePointerCapture(e.pointerId);
        const bounds = selectionBounds();
        if(bounds.valid) {
            const selection = screenToPlane(width,height,drawnPlaneNum,bounds);
            onSelectedPlaneChanged(selection);
        }

    };

    const move = e => {
        if(drawing) return;
        if(!mouseDown) return;
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setCurrentPos({x:x,y:y});
    };

    const selectionOnScreen = planeToScreen(width,height,drawnPlaneNum,selectedPlaneNum);
    const isSame=same(drawnPlaneNum,selectedPlaneNum);
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
                mixBlendMode:"difference",
                display:mouseDown&&bounds.valid?null:"none"}}
            >

        </div>
        <div style={{display:isSame||drawing?"none":null}}>
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
