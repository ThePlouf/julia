import React from 'react';

export default class Field extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if(this.props.onChange != null) {
            this.props.onChange(this.props.keyName,event.target.value);
        }
    }

    render() {
        return <div>
            <div>{this.props.label}</div>
            <input value={this.props.value} required={true} onChange={this.onChange} disabled={this.props.disabled} ></input>
        </div>
    }

}