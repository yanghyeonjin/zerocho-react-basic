### Class
#### lifecycle
- : constructor/function -> render -> ref (ref가 있다면) -> componentDidMount
- : state/props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate
- : 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

##### shouldComponentUpdate(nextProps, nextState, nextContext) {}
- ex) `A -> B -> C -> D -> E -> F -> G` (부모 -> 자식)
- A에서 G로 데이터 전달해주고 싶을 때 context 사용

#### render
- render 안에 this.setState() 하지 말자. (무한 렌더링)
- 부모에게 물려받은 props 값 변경 안 됨. 바꿔야 한다면, 자식의 state에 props를 넣어준다.
<br><br><br>

### Hooks
#### useCallback
- 함수 자체를 기억
- 자식 컴포넌트에게 props로 넘길 때, 그 함수에 꼭 적용해주어야 함. 그렇지 않으면, 자식은 계속 새로운 함수를 받는다고 생각하고 다시 렌더링 해버림.
#### useMemo
- 함수의 return 값을 기억