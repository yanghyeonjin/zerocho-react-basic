import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: []
    }

    timeout;
    startTime; // 초록색 나타난 때
    endTime; // 초록색 때 클릭한 순간

    onClickScreen = () => {
        const { state, message, result } = this.state;

        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.'
            });

            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭!'
                })
            }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 뒤 실행됨.

            this.startTime = new Date();
        } else if (state === 'ready') {
            // 화면 넘어가는 순서가 waiting -> ready -> now 인데, waiting에서 setTimeout 설정 해둠.
            // ready인 상태에서 클릭해도 설정해둔 타임아웃때문에 다음 단계인 now로 넘어감.
            // 따라서 타임아웃 셋팅해둔 것 clear 해주어야 함.
            clearTimeout(this.timeout);

            // 클릭하면 안 됨.
            // 성급하게 클릭했을 때
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
            })
        } else if (state === 'now') {
            // 이 때 클릭해야 잘 클릭한 것
            // 반응속도 체크 하는 부분 (초록색이 된 순간부터 클릭한 순간까지)

            this.endTime = new Date();

            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime] // 옛날 배열에 추가
                }
            })
        }
    }

    // 리셋버튼 클릭
    onClickReset = () => {
        this.setState({
            result: []
        })
    }

    renderAverage = () => {
        const { result } = this.state;

        // 한 번 이상 제대로 클릭하면 기록되기 시작함.
        // null -> 태그가 없는 것을 의미
        return result.length === 0 ? null :
            <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={this.onClickReset}>reset</button>
            </>
    }

    render() {
        const { state, message } = this.state;

        return (
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

export default ResponseCheck;