import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']]
}

const SET_WINNER = 'SET_WINNER';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 하면 안 됨.
            return {
                ...state,
                winner: action.winner
            }
        default:
            break;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

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

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData}></Table>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe;