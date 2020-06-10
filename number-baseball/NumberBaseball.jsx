import React, { Component } from 'react';

import Try from './Try';

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

    fruits = [
        { fruit: '사과', taste: '맛있다.' },
        { fruit: '포도', taste: '맛있다.' },
        { fruit: '바나나', taste: '맛있다.' },
        { fruit: '망고', taste: '맛있다.' },
        { fruit: '파인애플', taste: '맛있다.' }
    ]

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
                    {this.fruits.map((v, i) => {
                        return (
                            // props: Try 컴포넌트에게 데이터 전달
                            // 컴포넌트를 나누면 부모-자식 관계가 생긴다.
                            <Try key={v.fruit + v.taste} value={v} index={i} />
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default NumberBaseball;