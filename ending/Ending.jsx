// 파일 쪼갤 때, 적어주어야 한다.
const React = require('react');
const { Component } = React;
const { useState, useRef } = React;

// class Ending extends Component {
//     state = {
//         word: '제로초',
//         inputVal: '',
//         result: ''
//     };

//     input;
//     onRefInput = (c) => {
//         this.input = c;
//     }

//     onChangeInput = (e) => {
//         this.setState({
//             inputVal: e.target.value
//         })
//     }

//     onSubmitForm = (e) => {
//         e.preventDefault();

//         // 단어의 마지막 글자와 입력한 글자의 첫번째 글자가 같으면
//         if (this.state.word[this.state.word.length - 1] === this.state.inputVal[0]) {
//             this.setState({
//                 result: '딩동댕!',
//                 word: this.state.inputVal,
//                 inputVal: ''
//             })
//             this.input.focus();
//         } else {
//             this.setState({
//                 result: '땡!',
//                 inputVal: ''
//             })
//             this.input.focus();
//         }
//     }

//     render() {
//         return (
//             <>
//                 <div>{this.state.word}</div>
//                 <form onSubmit={this.onSubmitForm}>
//                     {/* value와 onChange는 짝꿍 아니면 defaultValue*/}
//                     <input type="text" ref={this.onRefInput} value={this.state.inputVal} onChange={this.onChangeInput} />
//                     {/* <input type="text" ref={this.onRefInput} defaultValue={this.state.inputVal} /> */}
//                     <button type="submit">입력!</button>
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         )
//     }
// }

const Ending = () => {
    const [word, setWord] = useState('제로초');
    const [inputVal, setInputVal] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setInputVal(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (word[word.length - 1] === inputVal[0]) {
            setResult('딩동댕!');
            setWord(inputVal);
            setInputVal('');

            inputRef.current.focus();
        } else {
            setResult('땡!');
            setInputVal('');

            inputRef.current.focus();
        }
    }

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input type="text" ref={inputRef} value={inputVal} onChange={onChangeInput} />
                <button type="submit">입력!</button>
            </form>
            <div>{result}</div>
        </>
    )
}

// 외부에서 사용할 수 있도록
module.exports = Ending;