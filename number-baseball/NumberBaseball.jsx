import React, { Component } from 'react';

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {

}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    };

    onSubmitForm = () => {

    }

    onChangeInput = () => {

    }

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input value={this.state.value} onChange={this.onChangeInput} maxLength="4" />
                    <button type="submit">제출!</button>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {/* react에서 반복문: map() 사용 */}
                    {['1', '2', '3', '4', '5'].map((val) => {
                        return (
                            <li>{val}</li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default NumberBaseball;