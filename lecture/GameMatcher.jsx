import React, { Component } from 'react';

class GameMatcher extends Component {
    render() {
        console.log(this.props.history, this.props.match);

        return (
            <div>hi</div>
        )
    }
}

export default GameMatcher;