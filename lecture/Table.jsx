import React, { memo } from 'react';
import Tr from './tr'

const Table = memo(({ tableData, dispatch }) => {
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((value, index) => {
                    return <Tr key={index} rowIndex={index} rowData={tableData[index]} dispatch={dispatch}></Tr>
                })}
            </tbody>
        </table >
    )
})

export default Table;