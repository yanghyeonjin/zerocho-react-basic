import React, { Component } from 'react';
import Ball from './Ball';

// 랜덤으로 로또번호 생성
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

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [], // 보너스 공 제외한 나머지 공
        bonus: null, // 보너스 공
        redo: false // 재실행 여부
    };

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="result">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                <button onClick={redo ? this.onClickRedo : () => { }}>한 번 더!</button>
            </>
        )
    }
}

export default Lotto;