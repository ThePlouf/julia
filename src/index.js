import React from 'react';
import ReactDOM from 'react-dom';

function lala(event) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 200);
    ctx.stroke();
}

class App extends React.Component {
    render() {
        return <canvas id="canvas" width="512" height="512" style={{border:'1px solid'}} onClick={lala}></canvas>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
