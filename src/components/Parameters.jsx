import React, {useRef} from 'react';

function Plane({plane,disabled,onChange,label}) {
    const leftInput = useRef();
    const topInput = useRef();
    const widthInput = useRef();
    const heightInput = useRef();

    const onFieldChange = () => {
        onChange({
            left:leftInput.current.value,
            top:topInput.current.value,
            width:widthInput.current.value,
            height:heightInput.current.value
        })
    };

    return <fieldset>
        <legend>{label}</legend>
        <div><label>Left<input ref={leftInput} value={plane.left} onChange={onFieldChange} disabled={disabled} ></input></label></div>
        <div><label>Top<input ref={topInput} value={plane.top} onChange={onFieldChange} disabled={disabled} ></input></label></div>
        <div><label>Width<input ref={widthInput} value={plane.width} onChange={onFieldChange} disabled={disabled} ></input></label></div>
        <div><label>Height<input ref={heightInput} value={plane.height} onChange={onFieldChange} disabled={disabled} ></input></label></div>
    </fieldset>
}

function Point({point,disabled,onChange,label}) {
    const xInput = useRef();
    const yInput = useRef();

    const onFieldChange = () => {
        onChange({
            x:xInput.current.value,
            y:yInput.current.value,
        })
    };

    return <fieldset>
        <legend>{label}</legend>
        <div><label>X<input ref={xInput} value={point.x} onChange={onFieldChange} disabled={disabled} ></input></label></div>
        <div><label>Y<input ref={yInput} value={point.y} onChange={onFieldChange} disabled={disabled} ></input></label></div>
    </fieldset>
}

function Iterations({value,disabled,onChange}) {
    return <div><label>Iterations
        <input value={value} onChange={e=>onChange(e.target.value)} disabled={disabled}></input>
    </label></div>
}

export default function Parameters({drawing,onPlaneChanged,onCChanged,onIterationsChanged,onReset,plane,c,iterations}) {
    return <div>
        <Plane plane={plane} label="Plane" disabled={drawing} onChange={onPlaneChanged} />
        <input type="button" onClick={onReset} type="button" value="Reset plane"></input>
        <Point point={c} disabled={drawing} label="C" onChange={onCChanged} />
        <Iterations value={iterations} disabled={drawing} onChange={onIterationsChanged} />
    </div>
}
