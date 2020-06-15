import React, { useContext, memo, useMemo } from 'react';
import MineSearchTd from './MineSearchTd';
import { TableContext } from './MineSearch';

const MineSearchTr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    return useMemo(() => {
        return (
            <tr>
                {console.log('real render tr')}
                {tableData[0] && Array(tableData[0].length).fill().map((v, i) => {
                    return <MineSearchTd rowIndex={rowIndex} colIndex={i}></MineSearchTd>
                })}
            </tr>
        )
    })
})

export default MineSearchTr;