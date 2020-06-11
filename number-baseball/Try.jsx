import React, { Component, memo } from 'react';

// class Try extends Component {
//     render() {
//         return (
//             // 반복되는 컴포넌트에는 key 속성
//             // props를 보면 '아, 나는 부모가 있구나' 라고 생각하면 됨.
//             <li>
//                 <div>{this.props.tryInfo.try}</div>
//                 <div>{this.props.tryInfo.result}</div>
//             </li>
//         )
//     }
// }


// hooks용 props/state 감지기
const Try = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
})

export default Try;