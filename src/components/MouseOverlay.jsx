import React, {useState} from 'react';

export default function MouseOverlay({width,height,drawing}) {
    const [position,setPosition] = useState({x:0,y:0});
    const [mouseOver,setMouseOver] = useState(false);

    if(drawing) return null;
    return (
        <svg onMouseMove={(e)=>{setPosition({x:e.nativeEvent.layerX,y:e.nativeEvent.layerY})}} onMouseEnter={()=>setMouseOver(true)} onMouseLeave={()=>setMouseOver(false)} width={width} height={height} style={{position:"absolute",top:"1px",left:"1px"}}>
              {(()=>{
                if(mouseOver) return <>
                    <line x1={position.x} y1="0" x2={position.x} y2={height} strokeWidth="1" stroke="black" strokeOpacity="50%"></line>
                    <line x1="0" y1={position.y} x2={width} y2={position.y} strokeWidth="1" stroke="black" strokeOpacity="50%"></line>
                    <line x1={position.x+1} y1="0" x2={position.x+1} y2={height} strokeWidth="1" stroke="white" strokeOpacity="50%"></line>
                    <line x1="0" y1={position.y+1} x2={width} y2={position.y+1} strokeWidth="1" stroke="white" strokeOpacity="50%"></line>
                    </>
            })()}
        </svg>
        );
}
