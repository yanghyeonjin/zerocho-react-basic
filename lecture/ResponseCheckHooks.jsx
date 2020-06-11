import React, { useState, useRef } from 'react';

const ResponseCheckHooks = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    // useRef는 값이 바뀌어도 다시 렌더링 되지 않음.

    // useRef 언제 사용?
    // 1. DOM에 직접 접근하고 싶을 때
    // >> ex) input.current.focus();
    // 
    // 2. 값은 바뀌지만 화면에는 영향주지 않을 때
    const timeout = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭!');
                startTime.current = new Date();

            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (state === 'ready') {
            clearTimeout(timeout.current);

            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.')
        } else if (state === 'now') {
            endTime.current = new Date();

            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            })
        }
    }

    const renderAverage = () => {
        return result.length === 0 ? null :
            <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onClickReset}>reset</button>
            </>
    }

    const onClickReset = () => {
        setResult([]);
    }

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheckHooks;