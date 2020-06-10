const React = require('react');
const ReactDOM = require('react-dom');
const { hot } = require('react-hot-loader/root');

const Ending = require('./Ending');
const Hot = hot(Ending); // 변경사항이 생기면 알아서 다시 빌드되도록 하기 위해...

ReactDOM.render(<Hot />, document.querySelector('#root'));