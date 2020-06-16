import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NumberBaseball from '../number-baseball/NumberBaseball';
import RockPaperScissorsHooks from './RockPaperScissorsHooks';
import LottoHooks from './LottoHooks';

const ReactRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Route path="/number-baseball" component={NumberBaseball}></Route>
                <Route path="/rock-paper-scissors" component={RockPaperScissorsHooks}></Route>
                <Route path="/lotto-generator" component={LottoHooks}></Route>
            </div>
        </BrowserRouter>
    )
}

export default ReactRouter;