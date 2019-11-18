import React from 'react';
import ReactDOM from 'react-dom';

const fractal = require('./fractal');

let width = "512"
let height = "512"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onDraw = this.onDraw.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }
    onMouseMove(event) {
        this.setState({
            x:event.nativeEvent.layerX,
            y:event.nativeEvent.layerY
        })
    }

    onComplete() {
        this.setState({cancel:null});
    }

    onDraw(event) {
        let params = {
            planeLeft:-2,
            planeTop:-2,
            planeWidth:4,
            planeHeight:4,
            cx:-0.7,
            cy:0,
            iterations:10000
        };
        this.setState({cancel:fractal.draw(document.getElementById("canvas"),params,this.onComplete)});
    }

    onClear(event) {
        fractal.clear(document.getElementById("canvas"));
    }

    onCancel(event) {
        if(this.state.cancel != null) {
            this.state.cancel();
            this.setState({cancel:null});
        }
    }

    render() {
        return <div  style={{position:"relative"}}>
            <canvas id="canvas" width={width} height={height}  style={{border:'1px solid'}}></canvas>
            <button onClick={this.onClear}disabled={this.state.cancel!=null}>Clear</button>
            <button onClick={this.onDraw} disabled={this.state.cancel!=null}>Draw</button>
            <button onClick={this.onCancel} disabled={this.state.cancel==null}>Cancel</button>
            <div>X: {this.state.x} Y:{this.state.y}</div>
            <svg onMouseMove={this.onMouseMove} width={width} height={height} style={{position:"absolute",top:"0px",left:"0px"}}>
                <circle cx={this.state.x} cy={this.state.y} r="5" fill="blue"></circle>
            </svg>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
