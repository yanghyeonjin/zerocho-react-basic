import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE, ACTION_TYPE } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444'
            }
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white'
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red'
            }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow'
            }
        default:
            return {
                background: 'white'
            }
    }
}

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?'
        default:
            return code || '';
    }
}

const MineSearchTd = memo(({ rowIndex, colIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) { // 게임 멈췄으면 그냥 리턴
            return;
        }

        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
                dispatch({
                    type: ACTION_TYPE.OPEN_CELL,
                    row: rowIndex,
                    col: colIndex
                })
                return;
            case CODE.MINE:
                dispatch({ type: ACTION_TYPE.CLICK_MINE, row: rowIndex, col: colIndex })
                return;
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][colIndex], halted])

    const onRightClickTd = useCallback((e) => {
        e.preventDefault(); // 메뉴 안뜨게

        if (halted) {
            return;
        }

        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({
                    type: ACTION_TYPE.FLAG_CELL, row: rowIndex, col: colIndex
                })
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({
                    type: ACTION_TYPE.QUESTION_CELL, row: rowIndex, col: colIndex
                })
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({
                    type: ACTION_TYPE.NORMALIZE_CELL, row: rowIndex, col: colIndex
                })
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][colIndex], halted])

    return useMemo(() => {
        return (
            <td onClick={onClickTd} onContextMenu={onRightClickTd} style={getTdStyle(tableData[rowIndex][colIndex])}>
                {getTdText(tableData[rowIndex][colIndex])}
                {console.log('real render td')}
            </td>
        )
    })
})

export default MineSearchTd;