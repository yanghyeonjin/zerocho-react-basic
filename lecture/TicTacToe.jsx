import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 하면 안 됨.
            return {
                ...state,
                winner: action.winner
            }

        case CLICK_CELL: {
            // Td.jsx에서 넘어온 row, col 사용
            // react의 불변성을 유지하기 위해 얕은 복사 사용.
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.col] = state.turn;

            return {
                ...state,
                tableData,
                recentCell: [action.row, action.col]
            }
        }

        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            }
        }

        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1]
            }
        }

        default:
            return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, winner, turn, recentCell } = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']])

    const onClickTable = useCallback(() => {
        // dispatch: action을 실행한다. (dispatch 안에는 action 객체)
        // action을 실행할 때마다 reducer()가 실행됨.
        dispatch({
            type: SET_WINNER, winner: 'O'
        })
    }, []);

    useEffect(() => {
        const [row, col] = recentCell;
        let win = false;

        if (row < 0) {
            return; // 초기상태인 경우 return
        }

        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 최근 클릭한 셀의 가로 검사
            win = true;
        }
        if (tableData[0][col] === turn && tableData[1][col] === turn && tableData[2][col] === turn) { // 최근 클릭한 셀의 세로 검사
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 왼-오 대각선 검사
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 오-왼 대각선 검사
            win = true;
        }

        if (win) {
            // 승리
            dispatch({
                type: SET_WINNER,
                winner: turn // 현재 turn을 winner로 설정
            })
            dispatch({
                type: RESET_GAME
            })
        } else {
            // 무승부 검사 (테이블이 꽉 채워져 있는지 확인)
            let all = true;
            tableData.forEach((row) => {
                row.forEach((col) => {
                    if (!col) {
                        // 하나라도 없으면
                        all = false;
                    }
                })
            });

            if (all) {
                // 무승부
                dispatch({
                    type: RESET_GAME
                })
            } else {
                // 아니면 다음 사람 턴으로 넘겨주기
                dispatch({
                    type: CHANGE_TURN
                })
            }
        }

    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}></Table>
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe;