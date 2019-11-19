import React from 'react';
import Field from './Field';

export default function Parameters(props) {
    const field=(label, keyName) => {
        return <Field label={label} keyName={keyName} value={props[keyName]} onChange={props.onParameterChanged} disabled={props.drawing} />;
    }
    
    return <div>
        {field("Left", "planeLeft")}
        {field("Top", "planeTop")}
        {field("Width", "planeWidth")}
        {field("Height", "planeHeight")}
        {field("C.x", "cx")}
        {field("C.y", "cy")}
        {field("Iterations", "iterations")}
    </div>;
}
