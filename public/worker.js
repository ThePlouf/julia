"use strict";

function computePoint(x,y,msg) {
    const escape = 4;

    let zx = (x*msg.planeWidth/msg.totalWidth)+msg.planeLeft;
    let zy = (y*msg.planeHeight/msg.totalHeight)+msg.planeTop;

    let iteration = 0;
  
    while ((zx * zx + zy * zy < escape**2) && (iteration < msg.iterations)) {
        const xtemp = zx * zx - zy * zy
        zy = 2 * zx * zy  + msg.cy 
        zx = xtemp + msg.cx
        iteration = iteration + 1 
    }
  
    if (iteration == msg.iterations) {
        return 0;
    } else {
        const log_zn = Math.log(zx*zx+zy*zy) / 2;
        const nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
        iteration = (iteration + 1.0) - nu;
        return iteration;
    }

}

onmessage = function(event) {
    try {
        const msg = event.data;
        const left = msg.left;
        const top = msg.top;
        const width = msg.width;
        const height = msg.height;

        const tileWidth = 32;
        const tileHeight = 32;

        for(let baseY=top;baseY<top+height;baseY+=tileHeight) {
            for(let baseX=left;baseX<left+width;baseX+=tileWidth) {

                const actualTileWidth = tileWidth;
                const actualTileHeight = tileHeight;

                if(baseX + actualTileWidth > left + width) actualTileWidth = left + width - baseX;
                if(baseY + actualTileHeight > top + height) actualTileHeight = top + height - baseY;

                const data=new Array(actualTileWidth*actualTileHeight);

                for(let ly=0;ly<actualTileHeight;ly++) {
                    for(let lx=0;lx<actualTileWidth;lx++) {
                        const x = lx+baseX;
                        const y = ly+baseY;

                        const v = computePoint(x,y,msg);

                        const offset = (lx+ly*actualTileWidth);
                        data[offset] = v;
                    }
                }

                const imgData = data.map(x=>x==0?[0,0,0,255]:[(Math.sin(x)+1)*127,(Math.sin(x+2)+1)*127,(Math.sin(x+5.2)+1)*127,255]).flat();

                const response = {
                    "type":"data",
                    "left":baseX,
                    "top":baseY,
                    "width":actualTileWidth,
                    "height":actualTileHeight,
                    "data":imgData
                };
                postMessage(response);
            }
        }
    } finally {
        postMessage({"type":"completed"});
        close();
    }
    
}
