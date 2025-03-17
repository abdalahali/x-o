let title = document.querySelector('.title');
let turn;
let squares = [];
let gameOver = false;
let vsAI = false;

function toggleMode() {
    vsAI = !vsAI;
    document.getElementById('mode').textContent = vsAI ? "لاعب ضد الكمبيوتر" : "لاعب ضد لاعب";
    resetGame();
}

function resetGame() {
    squares = [];
    gameOver = false;
    const randomStart = Math.random() < 0.5 ? 'x' : 'o';
    turn = randomStart;
    title.innerHTML = `<span>${randomStart}</span> Game`;
    
    for (let i = 1; i <= 9; i++) {
        const square = document.getElementById('item' + i);
        square.innerHTML = '';
        square.style.background = '#f25';
    }
    
    if (vsAI && turn === 'o') {
        setTimeout(aiMove, 500);
    }
}

function end(num1, num2, num3) {
    title.innerHTML = `${squares[num1]} فوز!`;
    document.getElementById('item' + num1).style.background = '#000';
    document.getElementById('item' + num2).style.background = '#000';
    document.getElementById('item' + num3).style.background = '#000';
    gameOver = true;
    setTimeout(resetGame, 4000);
}

function winner() {
    for (let i = 1; i <= 9; i++) {
        squares[i] = document.getElementById('item' + i).innerHTML;
    }
    
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combo of winningCombinations) {
        if (squares[combo[0]] && 
            squares[combo[0]] === squares[combo[1]] && 
            squares[combo[0]] === squares[combo[2]]) {
            end(combo[0], combo[1], combo[2]);
            return;
        }
    }

    if (squares.slice(1).every(square => square)) {
        title.innerHTML = 'تعادل!';
        setTimeout(resetGame, 4000);
        gameOver = true;
    }
}

function playerMove(id) {
    if (gameOver) return;
    const element = document.getElementById(id);
    if (element.innerHTML === '') {
        element.innerHTML = turn;
        turn = turn === 'x' ? 'o' : 'x';
        title.innerHTML = `<span>${turn}</span> Game`;
        winner();
        if (vsAI && !gameOver && turn === 'o') {
            setTimeout(aiMove, 500);
        }
    }
}

function aiMove() {
    const availableMoves = [];
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById('item' + i).innerHTML === '') {
            availableMoves.push(i);
        }
    }
    
    if (availableMoves.length === 0) return;

    let bestMove;
    
    // إذا كانت الحركة الأولى، اختر المنتصف
    if (availableMoves.length === 9) {
        bestMove = 5;
    } 
    // إذا كان المنتصف فارغًا في أي وقت، اختره
    else if (availableMoves.includes(5)) {
        bestMove = 5;
    } 
    // وإذا لم يكن متاحًا، استخدم minimax
    else {
        let bestScore = -Infinity;
        bestMove = -1;
        for (const move of availableMoves) {
            document.getElementById('item' + move).innerHTML = 'o';
            const score = minimax(0, false);
            document.getElementById('item' + move).innerHTML = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
    }

    document.getElementById('item' + bestMove).innerHTML = 'o';
    turn = 'x';
    title.innerHTML = `<span>${turn}</span> Game`;
    winner();
}

function minimax(depth, isMaximizing) {
    const result = checkWinnerMinimax();
    if (result !== null) {
        return result === 'o' ? 1 : result === 'x' ? -1 : 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 1; i <= 9; i++) {
            const square = document.getElementById('item' + i);
            if (square.innerHTML === '') {
                square.innerHTML = 'o';
                const score = minimax(depth + 1, false);
                square.innerHTML = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 1; i <= 9; i++) {
            const square = document.getElementById('item' + i);
            if (square.innerHTML === '') {
                square.innerHTML = 'x';
                const score = minimax(depth + 1, true);
                square.innerHTML = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinnerMinimax() {
    const currentSquares = [];
    for (let i = 1; i <= 9; i++) {
        currentSquares[i] = document.getElementById('item' + i).innerHTML;
    }

    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combo of winningCombinations) {
        if (currentSquares[combo[0]] &&
            currentSquares[combo[0]] === currentSquares[combo[1]] &&
            currentSquares[combo[0]] === currentSquares[combo[2]]) {
            return currentSquares[combo[0]];
        }
    }

    return currentSquares.slice(1).every(square => square) ? 'tie' : null;
}

// Initialize game
resetGame();
