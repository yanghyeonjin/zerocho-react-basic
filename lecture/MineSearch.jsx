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

const plantMine = (row, col, mine) => {
    // ex) row: 10, col: 10, mine: 20
    const candidate = Array(row * col).fill().map((arr, i) => { // 0 ~ 99 칸 만들기
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * col - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]; // 0 ~ 99 숫자 중에서 20개 숫자 고르기 (지뢰 숫자 만큼)
        shuffle.push(chosen); // shuffle 배열에 저장
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < col; j++) {
            rowData.push(CODE.NORMAL); // 기본은 normal로 해둠.
        }
    }

    // 랜덤으로 뽑아진 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
        // 만약 22이면 (2,2)
        const ver = Math.floor(shuffle[k] / col);
        const hor = shuffle[k] % col;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};

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