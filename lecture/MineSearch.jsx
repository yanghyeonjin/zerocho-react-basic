import React, { useReducer, createContext, useMemo } from 'react';
import MineSearchTable from './MineSearchTable';
import MineSearchForm from './MineSearchForm';

export const START_GAME = 'START_GAME';
export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0 // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    dispatch: () => { }
});

const initialState = {
    tableData: [],
    timer: 0,
    result: ''
}



const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.col, action.mine)
            }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // useMemo를 통해 캐싱 후 전달
    const value = useMemo(() => {
        return {
            tableData: state.tableData,
            dispatch: dispatch
        }
    }, [state.tableData])

    return (
        <TableContext.Provider value={value}>
            <MineSearchForm></MineSearchForm>
            <div>{state.timer}</div>
            <MineSearchTable></MineSearchTable>
            <div>{state.result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch;