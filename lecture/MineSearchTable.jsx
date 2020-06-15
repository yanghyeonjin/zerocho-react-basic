import React, { useContext } from 'react';
import { TableContext } from './MineSearch';
import MineSearchTr from './MineSearchTr';

const MineSearchTable = () => {
    const { tableData } = useContext(TableContext);

    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((v, i) => {
                    return <MineSearchTr rowIndex={i}></MineSearchTr>
                })}
            </tbody>
        </table>
    )
}

export default MineSearchTable;