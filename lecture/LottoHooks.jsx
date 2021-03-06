import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

// 랜덤으로 로또번호 생성
// Hooks에서는 다시 렌더링 될 때 모두 렌더링 하기 때문에 이 함수도 계속 호출됨.
// 이 함수가 10초 이상 걸리는 함수이면 문제!! => useMemo를 사용하여 해결
function getWinNumbers() {
    console.log('getWinNumbers');

    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bounsNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bounsNumber];
}

const BALL_APPEAR_TIME = 1000;

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // []에 있는 인자가 바뀌지 않는 한 getWinNumbers()는 다시 실행되지 않음.

    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);

    const timeouts = useRef([]);

    useEffect(() => {
        console.log('useEffect (no inputs)');

        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => {
                    return [...prevWinBalls, winNumbers[i]]
                })
            }, (i + 1) * BALL_APPEAR_TIME) // 첫번째 공은 1초, 두번째 공은 2초... 뒤에 등장하도록 셋팅 (1초마다 나타남.)
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);

        }, 7000);

        return () => { // return 부분이 componentWillUnmount
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }


        // winBalls.length === 0으로 넣으면 맨 처음에 두번 실행됨. (처음 배열도 length가 0이니까)
        // 목적은 한번더 버튼을 눌렀을 때 다시 셋팅해주는 것
        // 한번 더 버튼을 눌렀을 때, timeouts가 다시 셋팅되므로 timeouts.current 사용
    }, [timeouts.current]); // inputs가 빈 배열이면 componentDidMount와 동일. 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

    // 처음 상태로 초기화
    // 재렌더링 되어도 함수가 다시 생성되지 않음.
    const onClickRedo = useCallback(() => {
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);

        timeouts.current = [];
    }, [winNumbers]) // winNumbers 바뀌면 useCallback 다시 실행

    return (
        <>
            <div>당첨 숫자</div>
            <div id="result">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>

            {/* 조건에 따라 element 보일지 말지 결정 */}
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    )
}

export default Lotto;