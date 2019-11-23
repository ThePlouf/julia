import React from 'react';

export default function Actions({onDraw,onCancel,drawing}) {
    return <div>
        <input onClick={onDraw} type="submit" default={true} value="Draw"></input>
        <input onClick={onCancel} disabled={!drawing} type="button" value="Cancel"></input>
    </div>
}
