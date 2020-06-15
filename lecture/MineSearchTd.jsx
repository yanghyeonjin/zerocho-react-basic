import React, { useContext } from 'react';
import { TableContext, CODE } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444'
            }
        case CODE.OPENED:
            return {
                background: 'white'
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
    }
}

const MineSearchTd = ({ rowIndex, colIndex }) => {
    const { tableData } = useContext(TableContext);

    return (
        <td style={getTdStyle(tableData[rowIndex][colIndex])}>{getTdText(tableData[rowIndex][colIndex])}</td>
    )
}

export default MineSearchTd;