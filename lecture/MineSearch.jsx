import React, { useReducer } from 'react';
import MineSearchTable from './MineSearchTable';
import MineSearchForm from './MineSearchForm';

const initialState = {
    tableData: [],
    timer: 0,
    result: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <MineSearchForm></MineSearchForm>
            <div>{state.timer}</div>
            <MineSearchTable></MineSearchTable>
            <div>{state.result}</div>
        </>
    )
}

export default MineSearch;