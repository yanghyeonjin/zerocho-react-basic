import React, { useState, useCallback } from 'react';

const MineSearchForm = () => {
    const [row, setRow] = useState(10); // 세로 몇 줄
    const [col, setCol] = useState(10); // 가로 몇 줄
    const [mine, setMine] = useState(20); // 지뢰 몇 개

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, [])

    const onChangeCol = useCallback((e) => {
        setCol(e.target.value);
    }, [])

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, [])

    const onClickBtn = useCallback(() => {

    }, [])

    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={col} onChange={onChangeCol} />
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>
    )
}

export default MineSearchForm;