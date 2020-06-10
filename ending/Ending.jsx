// 파일 쪼갤 때, 적어주어야 한다.
const React = require('react');
const { Component } = React;

class Ending extends Component {
    state = {
        text: 'Hello, webpack'
    };

    render() {
        return (
            <h1>{this.state.text}</h1>
        )
    }
}

// 외부에서 사용할 수 있도록
module.exports = Ending;