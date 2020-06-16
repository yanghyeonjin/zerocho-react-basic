import React, { Component } from 'react';

import NumberBaseball from '../number-baseball/NumberBaseballClass';
import RockPaperScissors from './RockPaperScissors';
import Lotto from './Lotto';

class GameMatcher extends Component {
    render() {
        // this.props.history: 페이지 이동했던 내역
        // this.props.location: url 정보?
        // this.props.match: params 정보 들어있음. /game/:name에서 name 부분

        if (this.props.match.params.name === 'number-baseball') {
            return <NumberBaseball></NumberBaseball>
        } else if (this.props.match.params.name === 'rock-paper-scissors') {
            return <RockPaperScissors></RockPaperScissors>
        } else if (this.props.match.params.name === 'lotto-generator') {
            return <Lotto></Lotto>
        }
        return (
            <div>일치하는 게임이 없습니다.</div>
        )
    }
}

export default GameMatcher;