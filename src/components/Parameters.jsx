import React, {useRef} from 'react';

function Plane({plane,disabled,onChange}) {
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

    return <div>
        <div>Left</div><input ref={leftInput} value={plane.left} onChange={onFieldChange} disabled={disabled} ></input>
        <div>Top</div><input ref={topInput} value={plane.top} onChange={onFieldChange} disabled={disabled} ></input>
        <div>Width</div><input ref={widthInput} value={plane.width} onChange={onFieldChange} disabled={disabled} ></input>
        <div>Height</div><input ref={heightInput} value={plane.height} onChange={onFieldChange} disabled={disabled} ></input>
    </div>
}

function Point({point,disabled,onChange}) {
    const xInput = useRef();
    const yInput = useRef();

    const onFieldChange = () => {
        onChange({
            x:xInput.current.value,
            y:yInput.current.value,
        })
    };

    return <div>
        <div>X</div><input ref={xInput} value={point.x} onChange={onFieldChange} disabled={disabled} ></input>
        <div>Y</div><input ref={yInput} value={point.y} onChange={onFieldChange} disabled={disabled} ></input>
    </div>
}

function Iterations({value,disabled,onChange}) {
    return <div>
        <div>Iterations</div><input value={value} onChange={e=>onChange(e.target.value)} disabled={disabled}></input>
    </div>
}

export default function Parameters({drawing,onPlaneChanged,onCChanged,onIterationsChanged,onReset,plane,c,iterations}) {
    return <div>
        <div>
            <div>Plane</div>
            <Plane plane={plane} disabled={drawing} onChange={onPlaneChanged} />
            <button onClick={onReset} type="button">Reset plane</button>
        </div>
        <div>
            <div>C</div>
            <Point point={c} disabled={drawing} onChange={onCChanged} />
        </div>
        <Iterations value={iterations} disabled={drawing} onChange={onIterationsChanged} />
    </div>
}
