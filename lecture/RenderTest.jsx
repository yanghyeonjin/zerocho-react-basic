import React, { Component, createRef } from 'react';

// props/state 변경 감지
// > Component + shouldComponentUpdate를 사용하거나, PureComponent를 사용

// > PureComponent
// >> shouldComponentUpdate에서 return true, false를 언제 할지 알아서 결정한다.
// >> 언제 결정? props/state 값의 변경
// >> 단점은 배열, 객체와 같이 참조관계가 있는 타입은 어려워 한다. > 객체/배열의 reference가 바뀌면 return true

// >> array item의 값이 바뀌는 것을 알아차리기 위해
// >> 이전 배열을 복사해서 새로운 배열을 생성하는 방식을 사용하자. [...array, new data] (PureComponent/Component 상관없이)

// Component는 그럼 버려야 하나?
// >> 아니다. state/props 값이 바뀌어도 재렌더링 하고싶지 않을 때가 있을 수 있다.
// >> Component는 커스터마이징이 쉽다.

class RenderTest extends Component {
    // state는 웬만하면 간단한 구조를 쓰자. (나중에 다루기 어려워 질 수 있다.)
    // ex) a: 1, obj: {first: 'a', second: 'b'}, array: [1, 2, 3]
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
        this.inputRef.current.focus();
    }

    inputRef = createRef();

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <input type="text" ref={this.inputRef} />
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default RenderTest;