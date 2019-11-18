import React from 'react';
import ReactDOM from 'react-dom';

function clear() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function draw() {
    clear();

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

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
                break;
            }
    }
    
    let workerCount = 4;
    var top = 0;
    var height = Math.ceil(canvas.height / workerCount);

    let msg = {};
    msg.left = 0;
    msg.width = canvas.width;

    msg.totalWidth = canvas.width;
    msg.totalHeight = canvas.height;

    msg.planeLeft = -2;
    msg.planeTop = -2;
    msg.planeWidth = 4;
    msg.planeHeight = 4;

    msg.cx = -0.7;
    msg.cy = 0;
    msg.iterations = 10000;

    for(var i=0;i<workerCount;i++) {
        let w = new Worker("worker.js");
        msg.top = top;
        msg.height = height;
        w.postMessage(msg);
        w.onmessage = workerEvent
        w = undefined;
    
        top = top + height;
        if(top + height > canvas.height) height = canvas.height - top;
    }


}

let width = "512"
let height = "512"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onMouseMove = this.onMouseMove.bind(this);
    }
    onMouseMove(event) {
        this.setState({
            x:event.nativeEvent.layerX,
            y:event.nativeEvent.layerY
        })
    }
    render() {
        return <div  style={{position:"relative"}}>
            <canvas id="canvas" width={width} height={height}  style={{border:'1px solid'}}></canvas>
            <button onClick={clear}>Clear</button>
            <button onClick={draw}>Draw</button>
            <div>X: {this.state.x} Y:{this.state.y}</div>
            <svg onMouseMove={this.onMouseMove} width={width} height={height} style={{position:"absolute",top:"0px",left:"0px"}}>
                <circle cx={this.state.x} cy={this.state.y} r="5" fill="blue"></circle>
            </svg>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
