/*
  Handles player (model)
*/
const playerFactory = (symbol, human) => {
  let _symbol = symbol;
  let _human = human;
  let getSymbol = () => _symbol;
  let isHuman = () => _human;

  const makeMove = (index) => {
    gameBoard.setField(index, getSymbol());
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

  return {
    getField,
    setField
  }
})();

/*
  Handles game logic (Controller)
*/
const gameController = (() => {
  let _turnCounter = 0;
  let player1 = playerFactory('X', false);
  let player2 = playerFactory('O', false);

  const playerMove = (index) => {
    (_turnCounter % 2 == 0) ? player1.makeMove(index) : player2.makeMove(index);
    _turnCounter++;
  }

  return {
    playerMove
  }
})();

/*
  Handles display (View)
*/
const displayController = (() => {
  const _gameFields = document.querySelectorAll(`.game-board-field`);

  const _render = () => {
    let count = 0;
    _gameFields.forEach((field) => {
      field.textContent = gameBoard.getField(count);
      count++;
    });
  }

  const _initialize = (() => {
    _gameFields.forEach((field) => {
      field.addEventListener('click', (e) => {
        let fieldIndex = Array.prototype.indexOf.call(field.parentNode.children, field);
        console.log(gameBoard.getField(fieldIndex));
        if(gameBoard.getField(fieldIndex) == undefined || gameBoard.getField(fieldIndex) == '')
          gameController.playerMove(fieldIndex);
        _render();
        console.log(fieldIndex);
      })
    });

  })();
})();