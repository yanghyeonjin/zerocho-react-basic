import React, { useContext } from 'react';
import MineSearchTd from './MineSearchTd';
import { TableContext } from './MineSearch';

const MineSearchTr = ({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((v, i) => {
                return <MineSearchTd rowIndex={rowIndex} colIndex={i}></MineSearchTd>
            })}
        </tr>
    )
}

export default MineSearchTr;