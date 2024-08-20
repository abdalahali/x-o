let title = document.querySelector('.title');
let turn;
let squares = [];
let gameOver = false;
let randomStart = Math.random() < 0.5 ? 'x' : 'o'; // random start variable

// set the initial turn based on the random start
turn = randomStart;

function end(num1, num2, num3) {
  title.innerHTML = `${squares[num1]} winner`;
  document.getElementById('item' + num1).style.background = '#000';
  document.getElementById('item' + num2).style.background = '#000';
  document.getElementById('item' + num3).style.background = '#000';
  setInterval(function(){title.innerHTML += '.'},1000);
  setTimeout(function() { location.reload(); }, 4000);
  
  gameOver = true;  // تعيين gameOver إلى true لإيقاف اللعبة
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
    setTimeout(function() { location.reload(); }, 4000);
    gameOver = true; // تعيين gameOver إلى true عند التعادل
  }
}

function game(id) {
  if (gameOver) return;  // إيقاف اللعبة إذا كانت منتهية
  let element = document.getElementById(id);
  if (element.innerHTML === '') {
    element.innerHTML = turn;
    turn = turn === 'x' ? 'o' : 'x';
    title.innerHTML = `<span>${turn}</span> game`;
    winner();
  }
}

// set the initial title based on the random start
title.innerHTML = `<span>${randomStart}</span> game`;