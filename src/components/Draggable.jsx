import React,{useState,useRef} from 'react';

export default function Draggable({Wrapped,left=0,top=0,cursor="grab",draggingCursor="grabbing",onDrag=()=>{},onDragDelta=()=>{},...props}) {
    const element = useRef(null);
    const [dragging,setDragging] = useState(false);
    const [baseMouse,setBaseMouse] = useState({x:0,y:0});
    const [basePos,setBasePos] = useState({x:0,y:0});
    const [lastPos,setLastPos] = useState({x:left,y:top});

    const down = function(event) {
        if(dragging) return;

        event.preventDefault();
        setDragging(true);
        setBaseMouse({x:event.clientX,y:event.clientY});
        setBasePos({x:element.current.offsetLeft,y:element.current.offsetTop});
        setLastPos({x:element.current.offsetLeft,y:element.current.offsetTop});
        element.current.setPointerCapture(event.pointerId);
    }

    const move=function(event) {
        if(!dragging) return;
        event.preventDefault();

        const offsetX = event.clientX - baseMouse.x;
        const offsetY = event.clientY - baseMouse.y;

        const posX = basePos.x + offsetX;
        const posY = basePos.y + offsetY;

        onDrag(posX, posY);
        onDragDelta(posX-lastPos.x,posY-lastPos.y);
        setLastPos({x:posX,y:posY});
    }

    const up = function(event) {
        if(!dragging) return;
        event.preventDefault();

        setDragging(false);
        element.current.releasePointerCapture(event.pointerId);
    }

    if(Wrapped!=null) {
        const style = {position:"absolute",left:left+"px",top:top+"px",cursor:dragging?draggingCursor:cursor};
        return <div ref={element} onPointerDown={down} onPointerUp={up} onPointerMove={move} onLostPointerCapture={up} style={style}><Wrapped {...props} /></div>;
     } else {
        const style = {}
        if(props.style) {
            for (const key in props.style) style[key]=props.style[key];
        }
        delete props.style;

        style.position="absolute";
        style.left=left+"px";
        style.top=top+"px";
        style.cursor=dragging?draggingCursor:cursor;

        return <div ref={element} onPointerDown={down} onPointerUp={up} onPointerMove={move} onLostPointerCapture={up} style={style} {...props}>{props.children}</div>;
    }

}
