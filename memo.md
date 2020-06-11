#### render()
- render 안에 this.setState() 하지 말자. (무한 렌더링)
- 부모에게 물려받은 props 값 변경 안 됨.
- 바꿔야 한다면, 자식의 state에 props를 넣어준다.
- `const [result, setResult] = useState(props.result)`
<br>

#### shouldComponentUpdate(nextProps, nextState, nextContext) {}
- ex) `A -> B -> C -> D -> E -> F -> G` (부모 -> 자식)
- A에서 G로 데이터 전달해주고 싶을 때 context 사용