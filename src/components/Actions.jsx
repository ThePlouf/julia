import React from 'react';

export default function Actions({onClear,onDraw,onCancel,drawing}) {
    return <div>
        <input onClick={onDraw} disabled={drawing} type="submit" default={true} value="Draw"></input>
        <input onClick={onCancel} disabled={!drawing} type="button" value="Cancel"></input>
    </div>
}
