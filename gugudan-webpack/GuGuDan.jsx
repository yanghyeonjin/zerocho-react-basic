const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [inputVal, setInputVal] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        if (parseInt(inputVal) === first * second) {
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setInputVal('');
            setResult(`${inputVal} 정답`);

            inputRef.current.focus();
        } else {
            setInputVal('');
            setResult('땡!');

            inputRef.current.focus();
        }
    };

    const onChange = (e) => { setInputVal(e.target.value) };

    // <>는 React.Fragment의 간략한 표현
    return (
        <>
            <div>{first} X {second} = ?</div>

            <form onSubmit={onSubmit}>
                <label htmlFor="">정답 입력</label>
                <input ref={inputRef} type="number" name="answer" value={inputVal} onChange={onChange} />
                <button type="submit" className="">입력!</button>
            </form>

            <div>{result}</div>
        </>
    );
}

module.exports = GuGuDan;