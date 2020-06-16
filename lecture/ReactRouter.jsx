import React from 'react';
import { BrowserRouter, Route, Link, HashRouter } from 'react-router-dom';

import NumberBaseball from '../number-baseball/NumberBaseballClass';
import RockPaperScissors from './RockPaperScissors';
import Lotto from './Lotto';
import GameMatcher from './GameMatcher';

const ReactRouter = () => {
    return (
        // url 깔끔
        // 새로고침 하면 서버 쪽으로 요청해서 페이지 죽음.
        // <BrowserRouter>
        //     <div>
        //         <Link to="/number-baseball">숫자야구 </Link>
        //         <Link to="/rock-paper-scissors">가위바위보 </Link>
        //         <Link to="/lotto-generator">로또생성기</Link>
        //     </div>
        //     <div>
        //         <Route path="/number-baseball" component={NumberBaseball}></Route>
        //         <Route path="/rock-paper-scissors" component={RockPaperScissors}></Route>
        //         <Route path="/lotto-generator" component={Lotto}></Route>
        //     </div>
        // </BrowserRouter>

        // url에 #가 들어있음
        // 새로고침해도 살아있음.
        // 대신에 SEO에 안 잡힘. (SEO는 서버에게 이 페이지 알아? 라고 물어보기 때문에) -> 실무에서 잘 안 씀. (검색엔진에 안 잡히기 때문에)
        <HashRouter>
            <div>
                <Link to="/game/number-baseball">숫자야구 </Link>
                <Link to="/game/rock-paper-scissors">가위바위보 </Link>
                <Link to="/game/lotto-generator">로또생성기 </Link>
                <Link to="/game/index">game matcher</Link>
            </div>
            <div>
                <Route path="/game/:name" component={GameMatcher}></Route>
            </div>
        </HashRouter>
    )
}

export default ReactRouter;