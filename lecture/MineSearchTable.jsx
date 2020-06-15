import React, { useContext, memo, useMemo } from 'react';
import { TableContext } from './MineSearch';
import MineSearchTr from './MineSearchTr';

const MineSearchTable = memo(() => {
    const { tableData } = useContext(TableContext);

    return useMemo(() => {
        return (
            <table>
                <tbody>
                    {console.log('real render table')}
                    {Array(tableData.length).fill().map((v, i) => {
                        return <MineSearchTr rowIndex={i}></MineSearchTr>
                    })}
                </tbody>
            </table>
        )
    })
})

export default MineSearchTable;