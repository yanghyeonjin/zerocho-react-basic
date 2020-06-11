import React, { Component } from 'react';

class RockPaperScissors extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0
    }

    // 컴포넌트가 첫 렌더링 된 후
    componentDidMount() {

    }

    // 리렌더링 후
    componentDidUpdate() {

    }

    // 컴포넌트가 제거되기 직전
    componentWillUnmount() {

    }

    render() {
        const { result, score, imgCoord } = this.state; // imgCoord: 이미지 좌표

        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}
export default RockPaperScissors;