import React from 'react';
import ReactDOM from 'react-dom';
import MouseOverlay from './components/MouseOverlay'
import Actions from './components/Actions'
import Parameters from './components/Parameters'
import * as Fractal from './fractal'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            planeLeft:"-2",
            planeTop:"-2",
            planeWidth:"4",
            planeHeight:"4",
            cx:"-0.7",
            cy:"0",
            iterations:"10000"
        };
        
        this.onDraw = this.onDraw.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onParameterChanged = this.onParameterChanged.bind(this);
    }

    onComplete() {
        this.setState({cancel:null});
    }

    onDraw() {
        const params = {
            planeLeft:parseFloat(this.state.planeLeft),
            planeTop:parseFloat(this.state.planeTop),
            planeWidth:parseFloat(this.state.planeWidth),
            planeHeight:parseFloat(this.state.planeHeight),
            cx:parseFloat(this.state.cx),
            cy:parseFloat(this.state.cy),
            iterations:parseInt(this.state.iterations)
        };
        this.setState({cancel:Fractal.draw(document.getElementById("canvas"),params,this.onComplete)});
    }

    onClear() {
        Fractal.clear(document.getElementById("canvas"));
    }

    onCancel() {
        if(this.state.cancel != null) {
            this.state.cancel();
            this.setState({cancel:null});
        }
    }

    onParameterChanged(key,value) {
        this.setState({[key]:value});
    }

    render() {
        const width = "512";
        const height = "512";

        return <div style={{position:"relative"}}>
            <canvas id="canvas" width={width} height={height} style={{border:'1px solid'}}></canvas>
            <MouseOverlay width={width} height={height} drawing={this.state.cancel!=null} />
            <Actions drawing={this.state.cancel!=null} onDraw={this.onDraw} onClear={this.onClear} onCancel={this.onCancel} />
            <Parameters 
                drawing={this.state.cancel!=null}
                onParameterChanged={this.onParameterChanged}
                planeLeft={this.state.planeLeft}
                planeTop={this.state.planeTop}
                planeWidth={this.state.planeWidth}
                planeHeight={this.state.planeHeight}
                cx={this.state.cx}
                cy={this.state.cy}
                iterations={this.state.iterations}
            />
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
