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

const BALL_APPEAR_TIME = 1000;

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [], // 보너스 공 제외한 나머지 공
        bonus: null, // 보너스 공
        redo: false // 재실행 여부
    };

    timeouts = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;

        for (let i = 0; i < winNumbers.length - 1; i++) {
            // let을 쓰면 클로저 문제 해결???? 대박
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]]
                    }
                })
            }, (i + 1) * BALL_APPEAR_TIME) // 첫번째 공은 1초, 두번째 공은 2초... 뒤에 등장하도록 셋팅 (1초마다 나타남.)
        }

        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true
            });
        }, 7000)
    }

    componentDidMount() {
        this.runTimeouts();
    }

    // 한 번 더 눌렀을 때에는 여기에서 작업
    componentDidUpdate(prevProps, prevState) {
        if (this.state.winBalls.length === 0) {
            // 한 번 더 눌렀을 때, winBalls.length가 0이 된다.
            // 이때에만 setTimeout 다시 설정
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        // 정리 작업 해주자. 메모리 누수 문제 최대한 줄이자.
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        })
    }

    // 처음 상태로 초기화
    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false
        })
        this.timeouts = []
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="result">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>

                {/* 조건에 따라 element 보일지 말지 결정 */}
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        )
    }
}

export default Lotto;