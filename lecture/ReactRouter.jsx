import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import NumberBaseball from '../number-baseball/NumberBaseballClass';
import RockPaperScissors from './RockPaperScissors';
import Lotto from './Lotto';

const ReactRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Link to="/number-baseball">숫자야구 </Link>
                <Link to="/rock-paper-scissors">가위바위보 </Link>
                <Link to="/lotto-generator">로또생성기</Link>
            </div>
            <div>
                <Route path="/number-baseball" component={NumberBaseball}></Route>
                <Route path="/rock-paper-scissors" component={RockPaperScissors}></Route>
                <Route path="/lotto-generator" component={Lotto}></Route>
            </div>
        </BrowserRouter>
    )
}

export default ReactRouter;