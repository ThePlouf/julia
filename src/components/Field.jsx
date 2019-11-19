import React from 'react';

export default function Field({keyName,label=keyName,onChange=()=>{},value="",disabled=false}) {
    return <div>
        <div>{label}</div>
        <input value={value} required={true} onChange={event=>onChange(keyName,event.target.value)} disabled={disabled} ></input>
    </div>
}
