/*
  Handles player (model)
*/
const playerFactory = (symbol, human) => {
  let _symbol = symbol;
  let _human = human;
  let getSymbol = () => _symbol;
  let isHuman = () => _human;

  const makeMove = (index) => {
    if(gameBoard.getField(index) === undefined || gameBoard.getField(index) == '' || gameBoard.getField(index) == getSymbol()){ // do not overwrite
      gameBoard.setField(index, getSymbol());
      return true;
    }
    return false;
  }
  
  return {
    getSymbol,
    isHuman,
    makeMove
  }
};

const gameBoard = (() => {
  let _board = new Array(9);

  const getField = (index) => _board[index];
  
  const setField = (index, symbol) => {
    _board[index] = symbol;
  }

  const clearFields = () => {
    _board = new Array(9);
  }

  return {
    getField,
    setField,
    clearFields
  }
})();

/*
  Handles game logic (Controller)
*/
const gameController = (() => {
  let _turnCounter = 0;
  let _gameActive = true;
  let player1 = playerFactory('X', false);
  let player2 = playerFactory('O', false);
  const _winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const playerMove = (index) => {
    if(_gameActive) {
      (_turnCounter % 2 == 0) ? player1.makeMove(index) : player2.makeMove(index);
      _turnCounter++;

      if(_turnCounter % 2 == 0) {
        if(player1.makeMove(index)) _turnCounter++;
      } else {
        if(player2.makeMove(index)) _turnCounter++;
      }

      _checkResult();
    }
  }

  const _checkResult = () => {
    let draw = true;
    _winningConditions.forEach((condition) => {
      if(gameBoard.getField(condition[0]) == gameBoard.getField(condition[1])
        && gameBoard.getField(condition[1]) == gameBoard.getField(condition[2])) {
          let winningSymbol = gameBoard.getField(condition[0]);
          if(winningSymbol !== undefined && winningSymbol != '') {
            displayController.showMessage(`Player ${winningSymbol} has won the game!`);
            _gameActive = false;
            draw = false;
          }
        }
    })
    if(_turnCounter > 8 && draw) {
      displayController.showMessage(`The game is a draw!`);
      _gameActive = false;
    }
  }

  const resetGame = () => { 
    gameBoard.clearFields();
    _gameActive = true;
    _turnCounter = 0; 
  }

  return {
    playerMove,
    resetGame
  }
})();

/*
  Handles display (View)
*/
const displayController = (() => {
  const _gameFields = document.querySelectorAll(`.game-board-field`);
  const _restartButton = document.getElementById('restart-btn');
  const _messageBox = document.getElementById('winner-message-box');

  const _render = () => {
    let count = 0;
    _gameFields.forEach((field) => {
      field.textContent = gameBoard.getField(count);
      count++;
    });
  }

  const showMessage = (message) => {
    _messageBox.textContent = message;
    _messageBox.classList.remove('hide-display');
  }

  const _initialize = (() => {
    _gameFields.forEach((field) => {
      field.addEventListener('click', (e) => {
        let fieldIndex = Array.prototype.indexOf.call(field.parentNode.children, field);
        console.log(gameBoard.getField(fieldIndex));
        gameController.playerMove(fieldIndex);
        _render();
      })

      field.addEventListener('mousedown', (e) => {
        e.preventDefault();
      })
    });

    _restartButton.addEventListener('click', (e) => {
      gameController.resetGame();
      _messageBox.classList.add('hide-display');
      _render();
    })

    _restartButton.addEventListener('mousedown', (e) => {
      e.preventDefault();
    })
  })();

  return {
    showMessage,
  }
})();