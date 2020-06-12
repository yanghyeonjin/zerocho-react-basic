import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

// import RenderTest from './RenderTest';
// const Hot = hot(RenderTest);

// import ResponseCheck from './ResponseCheck';
// const Hot = hot(ResponseCheck);

// import ResponseCheckHooks from './ResponseCheckHooks';
// const Hot = hot(ResponseCheckHooks);

// import RockPaperScissors from './RockPaperScissors';
// const Hot = hot(RockPaperScissors);

import RockPaperScissorsHooks from './RockPaperScissorsHooks';
const Hot = hot(RockPaperScissorsHooks);

ReactDOM.render(<Hot />, document.querySelector('#root'));