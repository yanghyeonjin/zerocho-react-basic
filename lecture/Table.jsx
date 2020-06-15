import React from 'react';
import Tr from './tr'

const Table = ({ tableData, dispatch }) => {
    return (
        <table>
            {Array(tableData.length).fill().map((value, index) => {
                return <Tr rowIndex={index} rowData={tableData[index]} dispatch={dispatch}></Tr>
            })}
        </table >
    )
}

export default Table;