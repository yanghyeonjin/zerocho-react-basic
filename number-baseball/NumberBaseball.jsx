import React, { useState } from 'react';

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

const NumberBaseball = () => {
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
}

export default NumberBaseball;