import React from 'react';
import ReactDOM from 'react-dom';

const fractal = require('./fractal');


class MouseOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x:0,
            y:0,
            mouseOver:false
        };
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

    }

    onMouseMove(event) {
        this.setState({
            x:event.nativeEvent.layerX,
            y:event.nativeEvent.layerY
        })
    }

    onMouseEnter() {
        this.setState({mouseOver:true})
    }

    onMouseLeave() {
        this.setState({mouseOver:false})
    }

    render() {
        if(this.props.drawing) return null;
        return (
            <svg onMouseMove={this.onMouseMove} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} width={this.props.width} height={this.props.height} style={{position:"absolute",top:"0px",left:"0px"}}>
                {(()=>{
                    if(this.state.mouseOver) return <>
                        <line x1={this.state.x} y1="0" x2={this.state.x} y2={this.props.height} strokeWidth="1" stroke="black" strokeOpacity="50%"></line>
                        <line x1="0" y1={this.state.y} x2={this.props.width} y2={this.state.y} strokeWidth="1" stroke="black" strokeOpacity="50%"></line>
                        <line x1={this.state.x+1} y1="0" x2={this.state.x+1} y2={this.props.height} strokeWidth="1" stroke="white" strokeOpacity="50%"></line>
                        <line x1="0" y1={this.state.y+1} x2={this.props.width} y2={this.state.y+1} strokeWidth="1" stroke="white" strokeOpacity="50%"></line>
                        </>
                })()}
            </svg>
            );
    }
}

class Actions extends React.Component {
    render() {
        return <div>
            <button onClick={this.props.onClear} disabled={this.props.drawing}>Clear</button>
            <button onClick={this.props.onDraw} disabled={this.props.drawing}>Draw</button>
            <button onClick={this.props.onCancel} disabled={!this.props.drawing}>Cancel</button>
        </div>

    }
}

class Field extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if(this.props.onChange != null) {
            this.props.onChange(this.props.keyName,event.target.value);
        }
    }

    render() {
        return <div>
            <div>{this.props.label}</div>
            <input value={this.props.value} required={true} onChange={this.onChange} disabled={this.props.disabled} ></input>
        </div>
    }

}

class Parameters extends React.Component {
    field(label,keyName) {
        return <Field label={label} keyName={keyName} value={this.props[keyName]} onChange={this.props.onParameterChanged} disabled={this.props.drawing} />
    }
    render() {
        return <div>
            {this.field("Left","planeLeft")}
            {this.field("Top","planeTop")}
            {this.field("Width","planeWidth")}
            {this.field("Height","planeHeight")}
            {this.field("C.x","cx")}
            {this.field("C.y","cy")}
            {this.field("Iterations","iterations")}
            }
        </div>
    }

}

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
        let params = {
            planeLeft:parseFloat(this.state.planeLeft),
            planeTop:parseFloat(this.state.planeTop),
            planeWidth:parseFloat(this.state.planeWidth),
            planeHeight:parseFloat(this.state.planeHeight),
            cx:parseFloat(this.state.cx),
            cy:parseFloat(this.state.cy),
            iterations:parseInt(this.state.iterations)
        };
        this.setState({cancel:fractal.draw(document.getElementById("canvas"),params,this.onComplete)});
    }

    onClear() {
        fractal.clear(document.getElementById("canvas"));
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
        let width = "512"
        let height = "512"

        return <div  style={{position:"relative"}}>
            <canvas id="canvas" width={width} height={height}  style={{border:'1px solid'}}></canvas>
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
