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

const gameController = (() => {
  let _turnCounter = 0;
  let player1 = playerFactory('X', false);
  let player2 = playerFactory('O', false);

  const move = () => {
    player1.makeMove(5);
    displayController.render();
  }

  return {
    move
  }
})();

const displayController = (() => {

  const render = () => {
    let count = 0;
    let gameFields = document.querySelectorAll(`.game-board-field`);
    gameFields.forEach((field) => {
      field.textContent = gameBoard.getField(count);
      count++;
    });
  }

  return {
    render
  }
})();