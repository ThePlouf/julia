import React from 'react';

export default class Actions extends React.Component {
    render() {
        return <div>
            <button onClick={this.props.onClear} disabled={this.props.drawing}>Clear</button>
            <button onClick={this.props.onDraw} disabled={this.props.drawing}>Draw</button>
            <button onClick={this.props.onCancel} disabled={!this.props.drawing}>Cancel</button>
        </div>

    }
}
