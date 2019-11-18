"use strict";

function computePoint(x,y,msg) {
    let escape = 4;

    let zx = (x*msg.planeWidth/msg.totalWidth)+msg.planeLeft;
    let zy = (y*msg.planeHeight/msg.totalHeight)+msg.planeTop;

    var iteration = 0;
  
    while ((zx * zx + zy * zy < escape**2) && (iteration < msg.iterations)) {
        let xtemp = zx * zx - zy * zy
        zy = 2 * zx * zy  + msg.cy 
        zx = xtemp + msg.cx
        iteration = iteration + 1 
    }
  
    if (iteration == msg.iterations) {
        return 0;
    } else {
        let log_zn = Math.log(zx*zx+zy*zy) / 2;
        let nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
        iteration = (iteration + 1.0) - nu;
        return iteration;
    }

}

onmessage = function(event) {
    try {
        let msg = event.data;
        let left = msg.left;
        let top = msg.top;
        let width = msg.width;
        let height = msg.height;

        let tileWidth = 32;
        let tileHeight = 32;

        for(var baseY=top;baseY<top+height;baseY+=tileHeight) {
            for(var baseX=left;baseX<left+width;baseX+=tileWidth) {

                let actualTileWidth = tileWidth;
                let actualTileHeight = tileHeight;

                if(baseX + actualTileWidth > left + width) actualTileWidth = left + width - baseX;
                if(baseY + actualTileHeight > top + height) actualTileHeight = top + height - baseY;

                let data=new Array(actualTileWidth*actualTileHeight);

                for(var ly=0;ly<actualTileHeight;ly++) {
                    for(var lx=0;lx<actualTileWidth;lx++) {
                        let x = lx+baseX;
                        let y = ly+baseY;

                        let v = computePoint(x,y,msg);

                        let offset = (lx+ly*actualTileWidth);
                        data[offset] = v;
                    }
                }

                let smallest = 0;
                let largest = 10;
                let imgData = data.map(x=>(x-smallest)/(largest-smallest)).map(x=>[x*255,x*255,x*255,255]).flat();

                let response = {
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
