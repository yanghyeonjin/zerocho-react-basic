import React from 'react';
import Td from './Td'

const Tr = ({ rowIndex, rowData, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((value, index) => {
                return <Td rowIndex={rowIndex} colIndex={index} dispatch={dispatch} colData={rowData[index]}></Td>
            })}
        </tr>
    )
}

export default Tr;