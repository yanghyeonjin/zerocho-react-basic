import React, { useRef, useEffect, memo } from 'react';
import Td from './Td'

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
    const ref = useRef([]);
    useEffect(() => {
        // 바뀌는게 있다면 false가 뜸.
        console.log('rowIndex: ', rowIndex === ref.current[0]);
        console.log('rowData: ', rowData === ref.current[1]);
        console.log('dispatch: ', dispatch === ref.current[2]);

        ref.current = [rowIndex, rowData, dispatch]
    }, [rowIndex, rowData, dispatch])
    return (
        <tr>
            {Array(rowData.length).fill().map((value, index) => {
                return <Td key={index} rowIndex={rowIndex} colIndex={index} dispatch={dispatch} colData={rowData[index]}></Td>
            })}
        </tr>
    )
})

export default Tr;