import React from 'react';

export default class MouseOverlay extends React.Component {
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
            <svg onMouseMove={this.onMouseMove} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} width={this.props.width} height={this.props.height} style={{position:"absolute",top:"1px",left:"1px"}}>
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
