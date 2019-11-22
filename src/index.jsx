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
            drawnPlane:{left:"-2",top:"-2",width:"4",height:"4"},
            c:{x:"-0.7",y:"0"},
            iterations:"10000"
        };

        this.state.selectedPlane = this.state.drawnPlane;
        
        this.onDraw = this.onDraw.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onSelectedPlaneChanged = this.onSelectedPlaneChanged.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onComplete() {
        this.setState({
            cancel:null,
            });
    }

    onDraw() {
        console.log("draw");
        const params = {
            planeLeft:parseFloat(this.state.selectedPlane.left),
            planeTop:parseFloat(this.state.selectedPlane.top),
            planeWidth:parseFloat(this.state.selectedPlane.width),
            planeHeight:parseFloat(this.state.selectedPlane.height),
            cx:parseFloat(this.state.c.x),
            cy:parseFloat(this.state.c.y),
            iterations:parseInt(this.state.iterations)
        };
        this.setState({
            cancel:Fractal.draw(document.getElementById("canvas"),params,this.onComplete),
            drawPlane:this.state.selectedPlane
        });
    }

    onClear() {
        console.log("clear");
        Fractal.clear(document.getElementById("canvas"));
    }

    onCancel() {
        if(this.state.cancel != null) {
            this.state.cancel();
            this.setState({cancel:null});
        }
    }

    onReset() {
        this.setState({
            selectedPlane:this.state.drawnPlane
        });
    }

    onSelectedPlaneChanged(plane) {
        this.setState({
            selectedPlane:plane
        });
    }

    render() {
        const width = "512";
        const height = "512";

        return <div style={{position:"relative",backgroundColor:"white"}}>
            <canvas id="canvas" width={width} height={height} style={{border:'1px solid'}}></canvas>
            <MouseOverlay
                width={width}
                height={height}
                drawing={this.state.cancel!=null}
                drawnPlane={this.state.drawnPlane}
                selectedPlane={this.state.selectedPlane}
                onSelectedPlaneChanged={this.onSelectedPlaneChanged}
                onReset={this.onReset}
                onDraw={this.onDraw}
            />
            <form onSubmit={e=>{this.onDraw();e.preventDefault();}}>
                <Actions
                    drawing={this.state.cancel!=null}
                    onDraw={this.onDraw}
                    onClear={this.onClear}
                    onCancel={this.onCancel}
                />
                <Parameters 
                    drawing={this.state.cancel!=null}
                    onPlaneChanged={this.onSelectedPlaneChanged}
                    onCChanged={newC=>this.setState({c:newC})}
                    onIterationsChanged={newI=>this.setState({iterations:newI})}
                    plane={this.state.selectedPlane}
                    c={this.state.c}
                    iterations={this.state.iterations}
                    onReset={this.onReset}
                />
            </form>

        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
