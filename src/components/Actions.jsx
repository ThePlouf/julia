import React from 'react';

export default function Actions({onClear,onDraw,onCancel,drawing}) {
    return <div>
        <button onClick={onClear} disabled={drawing}>Clear</button>
        <button onClick={onDraw} disabled={drawing}>Draw</button>
        <button onClick={onCancel} disabled={!drawing}>Cancel</button>
    </div>

}
