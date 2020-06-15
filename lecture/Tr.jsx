import React from 'react';
import Td from './Td'

const Tr = ({ rowData }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((value, index) => {
                return <Td></Td>
            })}
        </tr>
    )
}

export default Tr;