import React, { useState, useRef, useEffect } from 'react';

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

const TIMEOUT = 200;

// 컴퓨터가 어떤 손 내고 있는지 판단하는 함수
const computerChoice = (imgCoord) => {
    for (let key in imgCoords) {
        if (imgCoords[key] === imgCoord) {
            return key;
        }
    }
}

const RockPaperScissorsHooks = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(imgCoords.rock);
    const [score, setScore] = useState(0);

    const intervalRef = useRef(null);

    // Hooks는 Class Component와 다르게 라이프사이클이 없다.
    // useEffect 사용으로 해결 (componentDidMount, componentDidUpdate 역할. 1:1 대응은 아님)

    // 맨 처음에만 한 번 실행하는데 imgCoord를 넣어주면 -> 난 imgCoord가 변경될 때 다시 실행한다.
    // 여러개 사용 가능 (state마다 다르게 효과를 낼 수 있기 때문)
    useEffect(() => {
        intervalRef.current = setInterval(changeHand, TIMEOUT);
        return () => {
            // 이 부분이 componentWillUnmount 역할
            clearInterval(intervalRef.current)
        }
    }, [imgCoord]); // 배열로 클로저 문제 해결, 배열에는 다시 실행할 값만 넣어주자.

    // 컴퓨터 손 바꾸는 함수
    const changeHand = () => {
        if (imgCoord === imgCoords.rock) {
            // 바위 -> 가위로 변경
            setImgCoord(imgCoords.scissor);
        } else if (imgCoord === imgCoords.scissor) {
            // 가위 -> 보로 변경
            setImgCoord(imgCoords.paper);
        } else if (imgCoord === imgCoords.paper) {
            // 보 -> 바위로 변경
            setImgCoord(imgCoords.rock);
        }
    }

    // onClick={(e) => this.onClickBtn('rock')}
    const onClickBtn = (choice) => (e) => {
        clearInterval(intervalRef.current); // 사진 멈추고

        // 점수계산
        const myScore = scores[choice]; // 나의 선택
        const cpuScore = scores[computerChoice(imgCoord)]; // 컴퓨터의 선택
        const diff = myScore - cpuScore;

        if (diff === 0) {
            // 비김
            setResult('비겼습니다!');
        } else if ([-1, 2].includes(diff)) {
            // 이긴 경우
            setResult('이겼습니다!');
            setScore((prevScore) => {
                return prevScore + 1
            })
        } else {
            // 짐
            setResult('졌습니다!');
            setScore((prevScore) => {
                return prevScore - 1
            })
        }

        setTimeout(() => {
            intervalRef.current = setInterval(changeHand, TIMEOUT)
        }, 1000);
    }

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )
}

export default RockPaperScissorsHooks;