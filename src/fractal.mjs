export function clear(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function draw(canvas,params,onComplete) {
    clear(canvas);

    const ctx = canvas.getContext("2d");

    const workerCount = 4;
    let currentWorking = 0;

    const workerEvent = event => {
        switch(event.data.type) {
            case "data":
                const left = event.data.left;
                const top = event.data.top;
                const width = event.data.width;
                const height = event.data.height;
                const id = ctx.createImageData(width,height);
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
    
    let top = 0;
    let height = Math.ceil(canvas.height / workerCount);

    const msg = {
        left:0,
        width:canvas.width,
        totalWidth:canvas.width,
        totalHeight:canvas.height
    };
    for(let k in params) msg[k]=params[k];

    const workers = new Array(workerCount);

    for(let i=0;i<workerCount;i++) {
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
