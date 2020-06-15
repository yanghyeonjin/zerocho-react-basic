import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ rowIndex, colIndex, dispatch, colData }) => {

    const onClickTd = useCallback(() => {
        console.log(rowIndex, colIndex);

        dispatch({
            type: CLICK_CELL,
            row: rowIndex,
            col: colIndex
        })
        dispatch({
            type: CHANGE_TURN
        })
    }, [])

    return (
        <td onClick={onClickTd}>{colData}</td>
    )
}

export default Td;