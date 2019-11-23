import React, {useRef} from 'react';

function Plane({plane,onChange,label}) {
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
        <div><label>Left<input ref={leftInput} value={plane.left} onChange={onFieldChange} type="number" step="any" required={true}></input></label></div>
        <div><label>Top<input ref={topInput} value={plane.top} onChange={onFieldChange} type="number" step="any"  required={true}></input></label></div>
        <div><label>Width<input ref={widthInput} value={plane.width} onChange={onFieldChange} type="number" step="any"  required={true}></input></label></div>
        <div><label>Height<input ref={heightInput} value={plane.height} onChange={onFieldChange} type="number" step="any"  required={true}></input></label></div>
    </fieldset>
}

function Point({point,onChange,label}) {
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
        <div><label>X<input ref={xInput} value={point.x} onChange={onFieldChange} type="number" step="any" required={true}></input></label></div>
        <div><label>Y<input ref={yInput} value={point.y} onChange={onFieldChange} type="number" step="any" required={true}></input></label></div>
    </fieldset>
}

function Iterations({value,onChange}) {
    return <div><label>Iterations
        <input value={value} onChange={e=>onChange(e.target.value)} type="number" step={1} min={1} required={true}></input>
    </label></div>
}

function same(p1,p2) {
    return parseFloat(p1.left)===parseFloat(p2.left) &&
        parseFloat(p1.top)===parseFloat(p2.top) &&
        parseFloat(p1.width)===parseFloat(p2.width) &&
        parseFloat(p1.height)===parseFloat(p2.height)
}

export default function Parameters({drawnPlane,onPlaneChanged,onCChanged,onIterationsChanged,onClearSelection,onPlaneReinit,plane,c,iterations}) {
    return <div>
        <Plane plane={plane} label="Plane" onChange={onPlaneChanged} />
        <input type="button" disabled={same(drawnPlane,plane)} onClick={onClearSelection} value="Clear selection"></input>
        <input type="button" onClick={onPlaneReinit} value="Reset plane"></input>
        <Point point={c} label="C" onChange={onCChanged} />
        <Iterations value={iterations} onChange={onIterationsChanged} />
    </div>
}
