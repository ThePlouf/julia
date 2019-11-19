import React from 'react';

export default function Actions({onClear,onDraw,onCancel,drawing}) {
    return <div>
        <button onClick={onClear} disabled={drawing} type="button">Clear</button>
        <button onClick={onDraw} disabled={drawing} default={true}>Draw</button>
        <button onClick={onCancel} disabled={!drawing} type="button">Cancel</button>
    </div>
}
