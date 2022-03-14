/*Game Variables*/
let gameActive=true;
const alert=document.querySelector('.result');
const resetButton=document.querySelector('.reset');
let board=["","","","","","","","",""];

/*Player Alerts*/
const xTurn = document.getElementById("X-turn");
const xWin = document.getElementById("X-win");
const oTurn = document.getElementById("O-turn");
const oWin = document.getElementById("O-win");
let activePlayer = "X";
xTurn.style.color = "red"
const winAlert = () => `Player ${activePlayer} wins!`;
const drawAlert = () => "Draw!";
const turnAlert = () => `Turn: ${activePlayer}`;
alert.innerHTML=turnAlert();

/*Game Functions*/
function changePlayer() {
    console.log("changePlayer")
    activePlayer= activePlayer==="O"?"X":"O";
    if (activePlayer === "O"){
        xTurn.style.color = "white"
        oTurn.style.color = "red";
    } else {
        xTurn.style.color = "red"
        oTurn.style.color = "white";
    }

    alert.innerHTML=turnAlert();
}

function gameDecision() {
    console.log("gameDecision")
    /*Game win conditions*/
    const winConditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    /*Game decision*/
    let win=false;
    for (let i=0; i<=7; i++) {
        const currrentCondition=winConditions[i];
        let cellA=board[currrentCondition[0]];
        let cellB=board[currrentCondition[1]];
        let cellC=board[currrentCondition[2]];
        if (cellA=== '' || cellB==='' || cellC==='') {
            continue;
        }
        if (cellA===cellB && cellB===cellC) {
            win=true;
            break;
        }
    }
    
    /*Handle win*/
    if (win) {
        alert.innerHTML=winAlert();
        if (activePlayer==='X') {
            document.getElementById("X-win").style.color = "red"
        } else {
            document.getElementById("O-win").style.color = "red"
        }
        gameActive=false;
        return;
    }

    /*Check for draw*/
    let draw=!board.includes("")
    if (draw) {
        alert.innerHTML=drawAlert();
        gameActive=false;
        return;
    }

    changePlayer();
}

function onCellClick(clickedCellEvent) {
    console.log("onCellClick")
    /*Save clicked cell*/
    const activeCell=clickedCellEvent.target;

    /*Find and store specific cell*/
    const activeCellIndex=parseInt(activeCell.getAttribute('cell-index'));
    console.log(`activeCellIndex: ${activeCellIndex}`)

    /*Determine if cell is empty*/
    if (board[activeCellIndex] !== "" || !gameActive) {
        return;
    }

    /*If cell click valid*/
    board[activeCellIndex]=activePlayer;
    activeCell.innerHTML=activePlayer;
    gameDecision();
}

function reset() {
    console.log("reset")
    board=["","","","","","","","",""];
    gameActive=true;
    activePlayer="X";
    alert.innerHTML=turnAlert();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML="");
    oTurn.style.color = "white"
    oWin.style.color = "white"
    xTurn.style.color = "red"
    xWin.style.color = "white"
}

/*Event Listeners*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', onCellClick));
resetButton.addEventListener('click', reset);