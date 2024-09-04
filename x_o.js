let title = document.querySelector('.title');
let turn;
let squares = [];
let gameOver = false;
let vsAI = false;  // الوضع الافتراضي هو لاعب ضد لاعب
let randomStart = Math.random() < 0.5 ? 'x' : 'o';
turn = randomStart;

// بداية العنوان حسب اللاعب العشوائي
title.innerHTML = `<span>${randomStart}</span> Game`;

function toggleMode() {
    vsAI = !vsAI;
    document.getElementById('mode').textContent = vsAI ? "لاعب ضد الكمبيوتر" : "لاعب ضد لاعب";
    resetGame();
}

function resetGame() {
    squares = [];
    gameOver = false;
    randomStart = Math.random() < 0.5 ? 'x' : 'o'; // إعادة تحديد البداية بشكل عشوائي
    turn = randomStart;
    title.innerHTML = `<span>${randomStart}</span> Game`;
    for (let i = 1; i <= 9; i++) {
        document.getElementById('item' + i).innerHTML = '';
        document.getElementById('item' + i).style.background = '#f25';
    }
}

function end(num1, num2, num3) {
    title.innerHTML = `${squares[num1]} Winner!`;
    document.getElementById('item' + num1).style.background = '#000';
    document.getElementById('item' + num2).style.background = '#000';
    document.getElementById('item' + num3).style.background = '#000';  
    setTimeout(resetGame, 4000);
    gameOver = true;
}

function winner() {
    for (let i = 1; i < 10; i++) {
        squares[i] = document.getElementById('item' + i).innerHTML;
    }
    if (squares[1] === squares[2] && squares[2] === squares[3] && squares[1] !== '') {
        end(1, 2, 3);
    } else if (squares[4] === squares[5] && squares[5] === squares[6] && squares[4] !== '') {
        end(4, 5, 6);
    } else if (squares[7] === squares[8] && squares[8] === squares[9] && squares[7] !== '') {
        end(7, 8, 9);
    } else if (squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== '') {
        end(1, 4, 7);
    } else if (squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== '') {
        end(2, 5, 8);
    } else if (squares[3] === squares[6] && squares[6] === squares[9] && squares[3] !== '') {
        end(3, 6, 9);
    } else if (squares[1] === squares[5] && squares[5] === squares[9] && squares[1] !== '') {
        end(1, 5, 9);
    } else if (squares[3] === squares[5] && squares[5] === squares[7] && squares[3] !== '') {
        end(3, 5, 7);
    } else if (squares.every(square => square !== '')) {
        title.innerHTML = 'Draw!';
        setTimeout(resetGame, 4000);
        gameOver = true;
    }
}

function playerMove(id) {
    if (gameOver) return;
    let element = document.getElementById(id);
    if (element.innerHTML === '') {
        element.innerHTML = turn;
        turn = turn === 'x' ? 'o' : 'x';
        title.innerHTML = `<span>${turn}</span> Game`;
        winner();
        if (vsAI && !gameOver && turn === 'o') {
            setTimeout(aiMove, 500);  // اترك مهلة صغيرة قبل أن يلعب الكمبيوتر
        }
    }
}

function aiMove() {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 1; i <= 9; i++) {
      if (document.getElementById('item' + i).innerHTML === '') {
          document.getElementById('item' + i).innerHTML = 'o';
          let score = minimax(0, false);
          document.getElementById('item' + i).innerHTML = '';

          if (score > bestScore) {
              bestScore = score;
              bestMove = i;
          }
      }
  }

  document.getElementById('item' + bestMove).innerHTML = 'o';
  turn = 'x';
  title.innerHTML = `<span>${turn}</span> Game`;
  winner();
}

function minimax(depth, isMaximizing) {
  let scores = {
      'o': 1,
      'x': -1,
      'tie': 0
  };

  let result = checkWinnerMinimax();
  if (result !== null) {
      return scores[result];
  }

  if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 1; i <= 9; i++) {
          if (document.getElementById('item' + i).innerHTML === '') {
              document.getElementById('item' + i).innerHTML = 'o';
              let score = minimax(depth + 1, false);
              document.getElementById('item' + i).innerHTML = '';
              bestScore = Math.max(score, bestScore);
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (let i = 1; i <= 9; i++) {
          if (document.getElementById('item' + i).innerHTML === '') {
              document.getElementById('item' + i).innerHTML = 'x';
              let score = minimax(depth + 1, true);
              document.getElementById('item' + i).innerHTML = '';
              bestScore = Math.min(score, bestScore);
          }
      }
      return bestScore;
  }
}

function checkWinnerMinimax() {
  let squares = [];
  for (let i = 1; i <= 9; i++) {
      squares[i] = document.getElementById('item' + i).innerHTML;
  }

  let winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
  ];

  for (let combination of winningCombinations) {
      if (combination.every(index => squares[index] === 'o')) {
          return 'o';
      } else if (combination.every(index => squares[index] === 'x')) {
          return 'x';
      }
  }

  if (squares.every(square => square !== '')) {
      return 'tie';
  }

  return null;
}

