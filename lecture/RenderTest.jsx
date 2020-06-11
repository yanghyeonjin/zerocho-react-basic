import React, { Component } from 'react';

class RenderTest extends Component {
    state = {
        counter: 0
    }

    // 리액트는 생각보다 멍청해서 재렌더링이 언제 될 것인지 지정해주어야 함.
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter) { // 현재 state의 counter가 변경되었을 때
            return true; // 재렌더링 하세요.
        }
        return false;
    }

    onClick = () => {
        // 값 변경 없이 setState만 호출하면 render 함수 다시 호출 됨.
        this.setState({})
    }

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default RenderTest;