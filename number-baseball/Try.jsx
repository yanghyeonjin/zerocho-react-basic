import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            // 반복되는 컴포넌트에는 key 속성
            // props를 보면 '아, 나는 부모가 있구나' 라고 생각하면 됨.
            <li key={this.props.value.fruit + this.props.value.taste}>
                <b>{this.props.value.fruit}</b> - {this.props.index}
                <div>컨텐츠1</div>
                <div>컨텐츠2</div>
                <div>컨텐츠3</div>
                <div>컨텐츠4</div>
                <div>컨텐츠5</div>
            </li>
        )
    }
}

export default Try;