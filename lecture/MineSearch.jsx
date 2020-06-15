import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import MineSearchTable from './MineSearchTable';
import MineSearchForm from './MineSearchForm';

export const ACTION_TYPE = {
    START_GAME: 'START_GAME',
    OPEN_CELL: 'OPEN_CELL',
    CLICK_MINE: 'CLICK_MINE',
    FLAG_CELL: 'FLAG_CELL',
    QUESTION_CELL: 'QUESTION_CELL',
    NORMALIZE_CELL: 'NORMALIZE_CELL',
    INCREMENT_TIMER: 'INCREMENT_TIMER'
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
    data: {
        row: 0,
        col: 0,
        mine: 0
    },
    timer: 0,
    result: '',
    halted: true,
    openedCell: 0
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
                data: {
                    row: action.row,
                    col: action.col,
                    mine: action.mine
                },
                openedCell: 0,
                timer: 0,
                tableData: plantMine(action.row, action.col, action.mine),
                halted: false
            }
        case ACTION_TYPE.OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });

            // 몇 개 열었는지 체크
            let openCount = 0;

            // 내 기준으로 주변 칸 열기
            const checked = [];
            const checkAround = (row, col) => {
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][col])) {
                    return;
                }

                if (row < 0 || row >= tableData.length || col < 0 || col >= tableData[0].length) { // 상하좌우가 칸이 아닌 경우 필터링
                    return;
                }

                // 한 번 검사한 칸은 다시 검사하지 않도록 (안 막아주면 재귀함수 돌릴 때 콜스택 터짐. 왜냐하면 내 칸 옆에 있는 칸들을 검사하니까 서로서로 검사하게 됨.)
                if (checked.includes(row + ',' + col)) {
                    return;
                } else {
                    checked.push(row + ',' + col);
                }

                let around = [];

                if (tableData[row - 1]) { // 윗 줄이 있는 경우
                    // 윗 줄 세칸에 넣어주기
                    around = around.concat(
                        tableData[row - 1][col - 1],
                        tableData[row - 1][col],
                        tableData[row - 1][col + 1]
                    )
                }

                // 클릭한 셀의 왼쪽, 오른쪽에 넣기
                around = around.concat(
                    tableData[row][col - 1],
                    tableData[row][col + 1]
                )

                // 아래칸
                if (tableData[row + 1]) {
                    around = around.concat(
                        tableData[row + 1][col - 1],
                        tableData[row + 1][col],
                        tableData[row + 1][col + 1]
                    )
                }

                // 주변에 지뢰있는 칸을 센다.
                const count = around.filter((v) => {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                }).length;

                if (count === 0) { // 지뢰 없으면
                    const near = [];
                    if (row - 1 > 0) {
                        near.push([row - 1, col - 1]);
                        near.push([row - 1, col]);
                        near.push([row - 1, col + 1]);
                    }
                    near.push([row, col - 1]);
                    near.push([row, col + 1]);

                    if (row + 1 < tableData.length) {
                        near.push([row + 1, col - 1]);
                        near.push([row + 1, col]);
                        near.push([row + 1, col - 1]);
                    }

                    near.forEach((n) => {
                        if (tableData[n[0]][n[1]] !== CODE.OPENED) { // 이미 연 칸이 아닌 경우에만 검사
                            checkAround(n[0], n[1]);
                        }
                    })
                }

                // 카운팅 제대로 안 되는 것 해결 (닫혀있었던 칸만 계산한다.)
                if (tableData[row][col] === CODE.NORMAL) {
                    openCount += 1;
                }
                tableData[row][col] = count;
            }

            checkAround(action.row, action.col);
            let halted = false;
            let result = '';
            if (state.data.row * state.data.col - state.data.mine === state.openedCell + openCount) {
                // 지뢰 뺀 나머지 칸 === 열린 칸 + 방금 연 칸
                halted = true;
                result = `${state.timer}초 만에 승리하셨습니다`;
            }

            return {
                ...state,
                tableData: tableData,
                openedCell: state.openedCell + openCount,
                halted: halted,
                result: result
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
        case ACTION_TYPE.INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1
            }
        }
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

    useEffect(() => {
        let timer;
        if (halted === false) {
            // 1초 마다 타이머 증가
            timer = setInterval(() => {
                dispatch({
                    type: ACTION_TYPE.INCREMENT_TIMER
                })
            }, 1000)
        }
        return () => {
            clearInterval(timer)
        }
    }, [halted])

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