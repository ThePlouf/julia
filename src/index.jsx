import React from 'react';
import ReactDOM from 'react-dom';
import MouseOverlay from './components/MouseOverlay'
import Actions from './components/Actions'
import Parameters from './components/Parameters'
import * as Fractal from './fractal'
import * as Utils from './fractal-utils'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drawnPlane:{left:"-2",top:"-2",width:"4",height:"4"},
            c:{x:"-0.7",y:"0"},
            iterations:"10000"
        };

        this.width = "512";
        this.height = "512";

        this.canvas = React.createRef();
    
        this.state.selectedPlane = this.state.drawnPlane;
        
        this.onDraw = this.onDraw.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onSelectedPlaneChanged = this.onSelectedPlaneChanged.bind(this);
        this.onSelectionReset = this.onSelectionReset.bind(this);
        this.onPlaneReinit = this.onPlaneReinit.bind(this);
    }

    onComplete() {
        this.setState({
            cancel:null,
            });
    }

    selectionToScreen() {
        const rect = this.state.selectedPlane;
        const drawn = this.state.drawnPlane;

        const x = (rect.left - drawn.left) * this.width / drawn.width
        const y = (rect.top - drawn.top) * this.height / drawn.height
        const w = rect.width * this.width / drawn.width;
        const h = rect.height * this.height / drawn.height;

        return {left:x,top:y,width:w,height:h};
    }

    onDraw() {
        this.onCancel();
        Fractal.zoom(this.canvas.current,this.selectionToScreen())
        const plane = Utils.parsePlane(this.state.selectedPlane);

        const params = {
            planeLeft:plane.left,
            planeTop:plane.top,
            planeWidth:plane.width,
            planeHeight:plane.height,
            cx:parseFloat(this.state.c.x),
            cy:parseFloat(this.state.c.y),
            iterations:parseInt(this.state.iterations)
        };
        this.setState({
            cancel:Fractal.draw(this.canvas.current,params,this.onComplete),
            drawnPlane:this.state.selectedPlane,
        });
    }

    onCancel() {
        if(this.state.cancel != null) {
            this.state.cancel();
            this.setState({cancel:null});
        }
    }

    onSelectionReset() {
        this.setState({
            selectedPlane:this.state.drawnPlane
        });
    }

    onPlaneReinit() {
        const plane={left:"-2",top:"-2",width:"4",height:"4"};
        this.setState({
            selectedPlane:plane
        },this.onDraw);
    }

    onSelectedPlaneChanged(plane) {
        this.setState({
            selectedPlane:plane
        });
    }

    componentDidMount() {
        setTimeout(this.onDraw,0);
    }

    render() {
        return <div style={{position:"relative",backgroundColor:"white"}}>
            <canvas ref={this.canvas} width={this.width} height={this.height} style={{border:'1px solid'}}></canvas>
            <MouseOverlay
                width={this.width}
                height={this.height}
                drawnPlane={this.state.drawnPlane}
                selectedPlane={this.state.selectedPlane}
                onSelectedPlaneChanged={this.onSelectedPlaneChanged}
                onReset={this.onSelectionReset}
                onDraw={this.onDraw}
            />
            <form onSubmit={e=>{this.onDraw();e.preventDefault();}}>
                <Actions
                    drawing={this.state.cancel!=null}
                    onCancel={this.onCancel}
                />
                <Parameters
                    drawnPlane={this.state.drawnPlane}
                    onPlaneChanged={this.onSelectedPlaneChanged}
                    onCChanged={newC=>this.setState({c:newC})}
                    onIterationsChanged={newI=>this.setState({iterations:newI})}
                    plane={this.state.selectedPlane}
                    c={this.state.c}
                    iterations={this.state.iterations}
                    onClearSelection={this.onSelectionReset}
                    onPlaneReinit={this.onPlaneReinit}
                />
            </form>

        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
