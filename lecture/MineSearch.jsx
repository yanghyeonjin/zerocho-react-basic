import React, { useReducer, createContext, useMemo } from 'react';
import MineSearchTable from './MineSearchTable';
import MineSearchForm from './MineSearchForm';

export const ACTION_TYPE = {
    START_GAME: 'START_GAME',
    OPEN_CELL: 'OPEN_CELL',
    CLICK_MINE: 'CLICK_MINE',
    FLAG_CELL: 'FLAG_CELL',
    QUESTION_CELL: 'QUESTION_CELL',
    NORMALIZE_CELL: 'NORMALIZE_CELL'
}

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
    halted: true,
    dispatch: () => { }
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true
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
        case ACTION_TYPE.START_GAME: // 게임 시작 (셀 만들기)
            return {
                ...state,
                tableData: plantMine(action.row, action.col, action.mine),
                halted: false
            }
        case ACTION_TYPE.OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.OPENED;

            // 주변 칸 열기
            let around = [];

            if (tableData[action.row - 1]) { // 윗 줄이 있는 경우
                // 윗 줄 세칸에 넣어주기
                around = around.concat(
                    tableData[action.row - 1][action.col - 1],
                    tableData[action.row - 1][action.col],
                    tableData[action.row - 1][action.col + 1]
                )
            }

            // 클릭한 셀의 왼쪽, 오른쪽에 넣기
            around = around.concat(
                tableData[action.row][action.col - 1],
                tableData[action.row][action.col + 1]
            )

            // 아래칸
            if (tableData[action.row + 1]) {
                around = around.concat(
                    tableData[action.row + 1][action.col - 1],
                    tableData[action.row + 1][action.col],
                    tableData[action.row + 1][action.col + 1]
                )
            }

            // 주변에 지뢰있는 칸을 센다.
            const count = around.filter((v) => {
                return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
            }).length;
            tableData[action.row][action.col] = count;

            return {
                ...state,
                tableData: tableData
            }
        }
        case ACTION_TYPE.CLICK_MINE: {// 지뢰 클릭
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICKED_MINE;

            return {
                ...state,
                tableData: tableData,
                halted: true // 게임 중단
            }
        };
        case ACTION_TYPE.FLAG_CELL: {// 깃발로 변경
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if (tableData[action.row][action.col] === CODE.MINE) {
                // 깃발을 꽂을 칸이 지뢰가 있는 칸이면
                tableData[action.row][action.col] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.col] = CODE.FLAG;
            }

            return {
                ...state,
                tableData: tableData,
                halted: true // 게임 중단
            }
        };
        case ACTION_TYPE.QUESTION_CELL: {// 깃발 -> 물음표 
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
                tableData[action.row][action.col] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.col] = CODE.QUESTION;
            }

            return {
                ...state,
                tableData: tableData
            }
        };
        case ACTION_TYPE.NORMALIZE_CELL: {// 물음표 -> 기본
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
                tableData[action.row][action.col] = CODE.MINE;
            } else {
                tableData[action.row][action.col] = CODE.NORMAL;
            }

            return {
                ...state,
                tableData: tableData
            }
        };
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    // useMemo를 통해 캐싱 후 전달
    const value = useMemo(() => {
        return {
            tableData: tableData,
            halted: halted,
            dispatch: dispatch
        }
    }, [tableData, halted])

    return (
        <TableContext.Provider value={value}>
            <MineSearchForm></MineSearchForm>
            <div>{timer}</div>
            <MineSearchTable></MineSearchTable>
            <div>{result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch;