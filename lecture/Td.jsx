import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, colIndex, dispatch, colData }) => {

    // 불필요한 렌더링 잡아내기
    const ref = useRef([]);
    useEffect(() => {
        // 바뀌는게 있다면 false가 뜸.
        console.log('rowIndex: ', rowIndex === ref.current[0]);
        console.log('colIndex: ', colIndex === ref.current[1]);
        console.log('dispatch: ', dispatch === ref.current[2]);
        console.log('colData: ', colData === ref.current[3]);

        console.log('colData', colData)
        console.log('ref', ref.current)

        ref.current = [rowIndex, colIndex, dispatch, colData]
    }, [rowIndex, colIndex, dispatch, colData])

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
})

export default Td;