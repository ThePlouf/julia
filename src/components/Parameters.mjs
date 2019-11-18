import React from 'react';
import Field from './Field';

export default class Parameters extends React.Component {
    field(label, keyName) {
        return <Field label={label} keyName={keyName} value={this.props[keyName]} onChange={this.props.onParameterChanged} disabled={this.props.drawing} />;
    }
    render() {
        return <div>
            {this.field("Left", "planeLeft")}
            {this.field("Top", "planeTop")}
            {this.field("Width", "planeWidth")}
            {this.field("Height", "planeHeight")}
            {this.field("C.x", "cx")}
            {this.field("C.y", "cy")}
            {this.field("Iterations", "iterations")}
        </div>;
    }
}
