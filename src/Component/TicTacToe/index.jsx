// import React, { useRef, useState } from 'react'
// import circle_icon from '../../assets/circle.png'
// import cross_icon from '../../assets/cross.png'

// import "./TicTacToe.css";

// let data = ["", "", "", "", "", "", "", "", ""];
// function TicTacToe() {
//     let [count, setCount] = useState(0);
//     const [lock, setLock] = useState(false);
//     let titleRef = useRef(null);
//     let box1 = useRef(null);
//     let box2 = useRef(null);
//     let box3 = useRef(null);
//     let box4 = useRef(null);
//     let box5 = useRef(null);
//     let box6 = useRef(null);
//     let box7 = useRef(null);
//     let box8 = useRef(null);
//     let box9 = useRef(null);
//     const toggle = (e, num) => {
//         if (lock) { return 0; }
//         if (count % 2 === 0) {
//             e.target.innerHTML = `<img src='${cross_icon}'>`;
//             data[num] = 'x';
//             setCount(++count);
//         } else {
//             e.target.innerHTML = `<img src='${circle_icon}'>`;
//             data[num] = '0';
//             setCount(++count);
//         }
//         checkWin();
//     }
//     let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
//     const checkWin = () => {
//         if (data[0] == data[1] && data[1] === data[2] && data[2] != "") {//First Row win
//             won(data[2]);
//         } else if (data[3] == data[4] && data[4] === data[5] && data[5] != "") { //Second Row Win
//             won(data[5]);
//         } else if (data[6] == data[7] && data[7] === data[8] && data[8] != "") { // Third Row Win
//             won(data[8]);
//         } else if (data[0] == data[3] && data[3] === data[6] && data[6] != "") { // First Column win
//             won(data[6]);
//         } else if (data[1] == data[4] && data[4] === data[7] && data[7] != "") {// Second Column  Win
//             won(data[7]);
//         } else if (data[2] == data[5] && data[5] === data[8] && data[8] != "") { // Third Column Win
//             won(data[8]);
//         } else if (data[0] == data[4] && data[4] === data[8] && data[8] != "") { // First Diagonal Win
//             won(data[8]);
//         } else if (data[2] == data[4] && data[4] === data[6] && data[6] != "") { // 
//             won(data[6]);
//         }
//     }

//     const won = (winner) => {
//         setLock(true);
//         if (winner === "x") {
//             titleRef.current.innerHTML = `Congratulation:<img src=${cross_icon}>`;
//         } else {
//             titleRef.current.innerHTML = `Congratulation:<img src=${circle_icon}>`;
//         }
//     }

//     const reset = () => {
//         setLock(false);
//         data = ["", "", "", "", "", "", "", "", ""];
//         titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span";
//         box_array.map((e) => {
//             e.current.innerHTML = "";
//         })
//     }
//     return (
//         <div>
//             <div className='container'>
//                 <h1 className='title' ref={titleRef}> Tic Tac Toe Game In <span>React</span></h1>
//                 <div className='board'>
//                     <div className="row1">
//                         <div className="boxes" onClick={(e) => toggle(e, 0)} ref={box1}></div>
//                         <div className="boxes" onClick={(e) => toggle(e, 1)} ref={box2}></div>
//                         <div className="boxes" onClick={(e) => toggle(e, 2)} ref={box3}></div>
//                     </div>
//                     <div className="row3">
//                         <div className="boxes" onClick={(e) => toggle(e, 3)} ref={box4}></div>
//                         <div className="boxes" onClick={(e) => toggle(e, 4)} ref={box5}></div>
//                         <div className="boxes" onClick={(e) => toggle(e, 5)} ref={box6}></div>
//                     </div>
//                     <div className="row2">
//                         <div className="boxes" onClick={(e) => toggle(e, 6)} ref={box7}></div>
//                         <div className="boxes" onClick={(e) => toggle(e, 7)} ref={box8}></div>
//                         <div className="boxes" onClick={(e) => toggle(e, 8)} ref={box9}></div>
//                     </div>
//                 </div>
//                 <button className='reset' onClick={reset}>Reset</button>
//             </div>
//         </div>
//     )
// }

// export default TicTacToe

import React, { useState } from 'react';
import circle_icon from '../../assets/circle.png';
import cross_icon from '../../assets/cross.png';

import './TicTacToe.css';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    const toggle = (index) => {
        if (lock || board[index] !== '') return;

        const newBoard = [...board];
        newBoard[index] = count % 2 === 0 ? 'x' : 'o';

        setBoard(newBoard);
        setCount(count + 1);
        checkWin(newBoard);
    };

    const checkWin = (currentBoard) => {
        for (const [a, b, c] of winningCombinations) {
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[b] === currentBoard[c]) {
                won(currentBoard[a]);
                return;
            }
        }

        if (currentBoard.every((cell) => cell !== '')) {
            // It's a draw
            won('draw');
        }
    };

    const won = (winner) => {
        setLock(true);
        const title = document.querySelector('.title');
        if (winner === 'x') {
            title.innerHTML = `Congratulation:<img src=${cross_icon}>`;
        } else if (winner === 'o') {
            title.innerHTML = `Congratulation:<img src=${circle_icon}>`;
        } else {
            title.innerHTML = 'It\'s a Draw!';
        }
    };

    const reset = () => {
        setLock(false);
        setBoard(Array(9).fill(''));
        const title = document.querySelector('.title');
        title.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
    };

    return (
        <div>
            <div className="container">
                <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>
                <div className="board">
                    {board.map((cell, index) => (
                        <div
                            key={index}
                            className="box"
                            onClick={() => toggle(index)}
                        >
                            {cell === 'x' && <img src={cross_icon} alt="Cross" />}
                            {cell === 'o' && <img src={circle_icon} alt="Circle" />}
                        </div>
                    ))}
                </div>
                <button className="reset" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default TicTacToe;
