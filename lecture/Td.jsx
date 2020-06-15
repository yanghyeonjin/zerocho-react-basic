import React, { useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = ({ rowIndex, colIndex, dispatch, colData }) => {

    const onClickTd = useCallback(() => {
        if (colData) {
            return; // 이미 선택한 부분은 다시 O/X로 못바꾸게
        }

        dispatch({
            type: CLICK_CELL,
            row: rowIndex,
            col: colIndex
        })
    }, [colData])

    return (
        <td onClick={onClickTd}>{colData}</td>
    )
}

export default Td;