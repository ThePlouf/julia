"use strict";
onmessage = function(event) {
    try {
        let data = event.data;
        let left = data.left;
        let top = data.top;
        let width = data.width;
        let height = data.height;

        let tileWidth = 32;
        let tileHeight = 32;

        for(var baseY=top;baseY<top+height;baseY+=tileHeight) {
            for(var baseX=left;baseX<left+width;baseX+=tileWidth) {

                let actualTileWidth = tileWidth;
                let actualTileHeight = tileHeight;

                if(baseX + actualTileWidth > left + width) actualTileWidth = left + width - baseX;
                if(baseY + actualTileHeight > top + height) actualTileHeight = top + height - baseY;

                let data=new Array(actualTileWidth*actualTileHeight*4);

                for(var ly=0;ly<actualTileHeight;ly++) {
                    for(var lx=0;lx<actualTileWidth;lx++) {
                        let x = lx+baseX;
                        let y = ly+baseY;

                        //let v = (x+y)%256;
                        let v = Math.floor((Math.cos(x/50)*Math.cos(y/50)+1)*128);

                        let offset = (lx+ly*actualTileWidth)*4;
                        data[offset + 0] = v;
                        data[offset + 1] = v;
                        data[offset + 2] = v;
                        data[offset + 3] = 255;
                    }
                }

                let msg = {
                    "type":"data",
                    "left":baseX,
                    "top":baseY,
                    "width":actualTileWidth,
                    "height":actualTileHeight,
                    "data":data
                };
                postMessage(msg);
            }
        }
    } finally {
        postMessage({"type":"completed"});
        close();
    }
    
}
