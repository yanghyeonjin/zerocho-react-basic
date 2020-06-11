import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

// import RenderTest from './RenderTest';
// const Hot = hot(RenderTest);

import ResponseCheck from './ResponseCheck';
const Hot = hot(ResponseCheck);

ReactDOM.render(<Hot />, document.querySelector('#root'));