export function clear(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function draw(canvas,params,onComplete) {
    clear(canvas);

    let ctx = canvas.getContext("2d");

    let workerCount = 4;
    var currentWorking = 0;

    let workerEvent = event => {
        switch(event.data.type) {
            case "data":
                let left = event.data.left;
                let top = event.data.top;
                let width = event.data.width;
                let height = event.data.height;
                let id = ctx.createImageData(width,height);
                id.data.set(event.data.data);
                ctx.putImageData(id, left, top);
                break;
            default:
                currentWorking --;
                if((currentWorking === 0) && !(onComplete == null)) {
                    onComplete();
                }
                break;
            }
    }
    
    var top = 0;
    var height = Math.ceil(canvas.height / workerCount);

    let msg = {
        left:0,
        width:canvas.width,
        totalWidth:canvas.width,
        totalHeight:canvas.height
    };
    for(var k in params) msg[k]=params[k];

    let workers = new Array(workerCount);

    for(var i=0;i<workerCount;i++) {
        workers[i] = new Worker("worker.js");
        msg.top = top;
        msg.height = height;
        workers[i].onmessage = workerEvent
        currentWorking ++;

        workers[i].postMessage(msg);
    
        top = top + height;
        if(top + height > canvas.height) height = canvas.height - top;
    }

    return ()=>{workers.forEach(w=>w.terminate())};
}
