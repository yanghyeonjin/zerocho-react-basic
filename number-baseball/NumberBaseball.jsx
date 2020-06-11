import React, { Component, useState, memo } from 'react';

import Try from './Try';

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
// 함수 내부에 this를 쓰지 않는 경우에 컴포넌트 바깥에 만들어 놓으면 좋다. (외부에서 사용할 수 있도록)
// 클래스 컴포넌트로 쓰던 Hooks로 쓰던 바깥에 빼놓은 함수는 영향을 받지 않기 때문에 편하다.
function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const choose = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(choose);
    }
    return array;
}

const NumberBaseball = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();

        // 입력한 값과 정답이 일치한다면
        if (value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, { try: value, result: '홈런!' }]
            })

            alert('게임을 다시 시작합니다!');

            // 게임 다시 시작
            setValue('');
            setAnswer(getNumbers());
            setTries([]);

        } else { // 답 틀렸을 때
            const answerArray = value.split('').map((v) => parseInt(v)); // 입력한 정답을 하나씩 쪼개서 숫자로 변경
            let strike = 0;
            let ball = 0;

            if (tries.length >= 9) { // 10번 이상 틀렸을 때
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 입니다!`)

                alert('게임을 다시 시작합니다!');

                // 게임 다시 시작
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                // 볼, 스트라이크 표시
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) { // 자리도 같고 숫자도 같을 때
                        strike++;
                    } else if (answer.includes(answerArray[i])) { // 숫자는 있지만 자리가 다를 때
                        ball++;
                    }
                }

                setTries((prevTries) => {
                    return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }]
                })
                setValue('');
            }
        }

    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input value={value} onChange={onChangeInput} maxLength="4" />
                <button type="submit">제출!</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {(() => {
                    const array = [];
                    for (let i = 0; i < tries.length; i++) {
                        array.push(<Try key={`${i + 1}차 시도 :`} tryInfo={v} />)
                    }
                    return array;
                })()}
                {/* {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
                    )
                })} */}
            </ul>
        </>
    )
})

// class NumberBaseball extends Component {
//     state = {
//         result: '',
//         value: '',
//         answer: getNumbers(), // ex) [1, 3, 5, 7]
//         tries: []
//     };

//     onSubmitForm = (e) => {
//         e.preventDefault();

//         // 입력한 값과 정답이 일치한다면
//         if (this.state.value === this.state.answer.join('')) {
//             this.setState((prevState) => {
//                 return {
//                     result: '홈런!',
//                     // 배열 타입인 state가 있을 때, 그냥 push() 하면 리액트가 바뀐지 모름.
//                     // 따라서 배열을 복사한 후 복사된 배열을 넣어주어야 한다.
//                     // 문법: [...originalArray, newData]
//                     tries: [...prevState.tries, { try: prevState.value, result: '홈런!' }]
//                 }

//             })

//             alert('게임을 다시 시작합니다!');
//             // 게임 다시 시작
//             this.setState({
//                 value: '',
//                 answer: getNumbers(),
//                 tries: []
//             })

//         } else { // 답 틀렸을 때
//             const answerArray = this.state.value.split('').map((v) => parseInt(v)); // 입력한 정답을 하나씩 쪼개서 숫자로 변경
//             let strike = 0;
//             let ball = 0;

//             if (this.state.tries.length >= 9) { // 10번 이상 틀렸을 때
//                 this.setState({
//                     result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')} 입니다!`
//                 })

//                 alert('게임을 다시 시작합니다!');

//                 // 게임 다시 시작
//                 this.setState({
//                     value: '',
//                     answer: getNumbers(),
//                     tries: []
//                 })
//             } else {
//                 // 볼, 스트라이크 표시

//                 for (let i = 0; i < 4; i++) {
//                     if (answerArray[i] === this.state.answer[i]) { // 자리도 같고 숫자도 같을 때
//                         strike++;
//                     } else if (this.state.answer.includes(answerArray[i])) { // 숫자는 있지만 자리가 다를 때
//                         ball++;
//                     }
//                 }

//                 this.setState((prevState) => {
//                     return {
//                         tries: [...prevState.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }],
//                         value: ''
//                     }
//                 })
//             }
//         }

//     }

//     onChangeInput = (e) => {
//         this.setState({
//             value: e.target.value
//         });
//     }

//     render() {
//         return (
//             <>
//                 <h1>{this.state.result}</h1>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input value={this.state.value} onChange={this.onChangeInput} maxLength="4" />
//                     <button type="submit">제출!</button>
//                 </form>
//                 <div>시도: {this.state.tries.length}</div>
//                 <ul>
//                     {/* react에서 반복문: map() 사용 */}
//                     {this.state.tries.map((v, i) => {
//                         return (
//                             // props: Try 컴포넌트에게 데이터 전달
//                             // 컴포넌트를 나누면 부모-자식 관계가 생긴다.
//                             // index를 key로 사용하는 것은 좋지 않다.
//                             // index를 key로 써도 되는 경우가 있는데, 지금 경우는 써도 된다.
//                             <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
//                         )
//                     })}
//                 </ul>
//             </>
//         )
//     }
// }

export default NumberBaseball;