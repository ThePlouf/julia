import React from 'react';
import ReactDOM from 'react-dom';

function getpixel(x,y) {
    return [0,0,0]
}

function clear() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let id = ctx.createImageData(1,1);
    let d  = id.data;
    d[3] = 255;

    var x = 0
    var y = 0

    let fn = function() {
        let v = getpixel(x,y);
        d[0] = v[0];
        d[1] = v[1];
        d[2] = v[2];
        ctx.putImageData(id, x, y);

        x = x + 1;
        if(x === canvas.width) {
            x = 0
            y = y + 1
            if(y === canvas.height) {
                return;
            }
        }

        setTimeout(fn,0)
    
    }

    setTimeout(fn,0)
}

let width = "64"
let height = "64"

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
