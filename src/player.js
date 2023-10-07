class Player {
  constructor() {}

  attack(y, x, gameBoard) {
    gameBoard.receiveAttack(y, x);
    return gameBoard;
  }
}

module.exports = { Player };
