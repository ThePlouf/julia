import React from 'react';
import Draggable from './Draggable'

export default function SelectionRectangle({left=0,top=0,width=50,height=50,cs=7,ls=1,onSelectionChange=()=>{},onAction=()=>{}}) {
    const move = (what,dx,dy) => {
        switch(what) {
            case "c":onSelectionChange(left+dx,top+dy,width,height);break;
            case "nw":onSelectionChange(left+dx,top+dy,width-dx,height-dy);break;
            case "ne":onSelectionChange(left,top+dy,width+dx,height-dy);break;
            case "sw":onSelectionChange(left+dx,top,width-dx,height+dy);break;
            case "se":onSelectionChange(left,top,width+dx,height+dy);break;
            default:break;
        }

    };

    let cleft = left;
    let ctop = top;
    let cwidth = width;
    let cheight = height;
    
    let c1 = "nwse-resize";
    let c2 = "nesw-resize";

    if(cwidth<0) {
        cleft = cleft + cwidth;
        cwidth = -cwidth;
        [c1,c2] = [c2,c1];
    }

    if(cheight<0) {
        ctop = ctop + cheight;
        cheight = -cheight;
        [c1,c2] = [c2,c1];
    }

    const hs = (cs-1)/2;
    return <>
        <Draggable onDragDelta={(x,y)=>move("c",x,y)} left={cleft} top={ctop} onDoubleClick={e=>onAction()} style={{width:cwidth+"px",height:cheight+"px",border:"1px solid white"}}></Draggable>
        <Draggable onDragDelta={(x,y)=>move("nw",x,y)} left={left-hs} top={top-hs} cursor={c1} draggingCursor={c1} style={{width:cs,height:cs,backgroundColor:"white"}}></Draggable>
        <Draggable onDragDelta={(x,y)=>move("ne",x,y)} left={left+width-hs+1} top={top-hs} cursor={c2} draggingCursor={c2} style={{width:cs,height:cs,backgroundColor:"white"}}></Draggable>
        <Draggable onDragDelta={(x,y)=>move("sw",x,y)} left={left-hs} top={top+height-hs+1} cursor={c2} draggingCursor={c2} style={{width:cs,height:cs,backgroundColor:"white"}}></Draggable>
        <Draggable onDragDelta={(x,y)=>move("se",x,y)} left={left+width-hs+1} top={top+height-hs+1} cursor={c1} draggingCursor={c1} style={{width:cs,height:cs,backgroundColor:"white"}}></Draggable>
    </>

}
