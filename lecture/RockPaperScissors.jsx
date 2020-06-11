import React, { Component } from 'react';

const imgCoords = {
    rock: '0',
    scissor: '-142px',
    paper: '-284px'
}

const scores = {
    rock: 0,
    scissor: 1,
    paper: -1
}

class RockPaperScissors extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0
    }

    interval;

    // 컴포넌트가 첫 렌더링 된 후 -> 함수 안에 비동기 요청을 많이 한다.
    componentDidMount() {
        // setInterval(): 반복 작업
        // 컴포넌트가 사라져도 알아서 사라지지 않는다.
        // componentWillUnmount에서 삭제
        this.interval = setInterval(() => {
            const { imgCoord } = this.state; // 바깥에 선언하면 자바스크립트 클로저 문제가 있음. 내부에 선언하자.
            if (imgCoord === imgCoords.rock) {
                // 바위 -> 가위로 변경
                this.setState({
                    imgCoord: imgCoords.scissor
                })
            } else if (imgCoord === imgCoords.scissor) {
                // 가위 -> 보로 변경
                this.setState({
                    imgCoord: imgCoords.paper
                })
            } else if (imgCoord === imgCoords.paper) {
                // 보 -> 바위로 변경
                this.setState({
                    imgCoord: imgCoords.rock
                })
            }
        }, 1000);
    }

    // 리렌더링 후
    componentDidUpdate() {

    }

    // 컴포넌트가 제거되기 직전 -> 함수 안에 비동기 요청 정리를 많이 한다.
    componentWillUnmount() {
        // 여기에서 삭제
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => {

    }

    render() {
        const { result, score, imgCoord } = this.state; // imgCoord: 이미지 좌표

        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
                <div>
                    <button id="rock" className="btn" onClick={() => { this.onClickBtn('rock') }}>바위</button>
                    <button id="scissor" className="btn" onClick={() => { this.onClickBtn('scissor') }}>가위</button>
                    <button id="paper" className="btn" onClick={() => { this.onClickBtn('paper') }}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}
export default RockPaperScissors;