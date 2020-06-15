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
- 순서 중요
- 최상위에 빼주자.
- 조건문 안에 절대 넣으면 안되고 함수나 반복문 안에도 웬만하면 넣지 말자.
- Hooks안에 Hooks도 하지 말자.

#### useCallback
- 함수 자체를 기억
- 자식 컴포넌트에게 props로 넘길 때, 그 함수에 꼭 적용해주어야 함. 그렇지 않으면, 자식은 계속 새로운 함수를 받는다고 생각하고 다시 렌더링 해버림.

#### useMemo
- 함수의 return 값을 기억

#### useEffect
- componentDidMount만 하고 싶다.
```javascript
useEffect(() => {
    // ajax
}, []) // inputs에 아무것도 안 넣으면 됨.
```
<br>

- componentDidUpdate만 하고 싶다.
```javascript
const mounted = useRef(false); // false로 설정하고
useEffect(() => {
    if (!mounted.current) { // 처음 render 되었을 때에는 false이니까 if문에 들어옴.
        mounted.current = true; // true로만 바꾸고 아무것도 안 함.
    }
}, [changeValue])
```
<br><br><br>

### Check List
- Chrome react tool 설치 및 렌더링 하이라이트 설정
- 다 만들고 렌더링 최적화 (성능 최적화. 초록색 정도는 ㄱㅊ)
- 직접 만든 함수는 useCallback으로 감싸주기
- Class Component (development) -> Hooks (production)