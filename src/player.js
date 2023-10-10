class Player {
  attack(y, x, gameBoard) {
    gameBoard.receiveAttack(y, x);
  }
}

class Computer extends Player {
  constructor() {
    super();
    this.lastHit = [];
    this.nextHit = [];
  }

  smartAttack(gameBoard) {
    if (!this.checkNextHit() && !this.checkLastHit()) {
      const spot = getNewSpot(gameBoard);

      this.attack(spot[0], spot[1], gameBoard);
      this.registerHit(spot[0], spot[1], gameBoard);
    } else if (!this.checkNextHit() && this.checkLastHit()) {
      this.attackNextHit(gameBoard);
    } else {
      this.attackNextHit(gameBoard);
    }
  }

  getNewSpot(gameBoard) {
    let y = this.getIndex();
    let x = this.getIndex();
    while (gameBoard.arr[y][x] === null || gameBoard.arr[y][x] === 1) {
      y = this.getIndex();
      x = this.getIndex();
    }
    return [y, x];
  }

  getIndex() {
    return Math.floor(Math.random() * 10);
  }

  checkLastHit() {
    if (this.lastHit.length === 0) return false;

    if (this.lastHit.length === 1) {
      this.setNextHit();
    } else {
      this.setNextHits();
    }
    return true;
  }

  checkNextHit() {
    if (this.nextHit.length === 0) return false;

    return true;
  }

  attackNextHit(gameBoard) {
    let i = 0;
    while (i < this.nextHit.length) {
      const spot = this.nextHit[i];
      if (gameBoard.arr[spot[0]][spot[1]] !== undefined) {
        this.attack(spot[0], spot[1], gameBoard);
        this.registerHit(spot[0], spot[1], gameBoard);
        this.nextHit.splice(i, 1);
        break;
      } else {
        this.nextHit.splice(i, 1);
      }
      i++;
    }
  }

  setNextHit(arr = this.lastHit) {
    const spot = arr[0];
    y = spot[1] - 1;
    x = spot[0] - 1;

    this.nextHit.push([y, x + 1]);
    this.nextHit.push([y, x - 1]);
    this.nextHit.push([y + 1, x]);
    this.nextHit.push([y - 1, x]);
  }

  setNextHits(arr = this.lastHit) {
    const first = arr[0];
    const last = arr[arr.length - 1];

    if (last[0] === first[0]) {
      this.nextHit.push([last[0], last[1] + 1]);
      this.nextHit.push([first[0], first[1] - 1]);
    } else if (last[1] === first[1]) {
      this.nextHit.push([last[0] + 1, last[1]]);
      this.nextHit.push([first[0] - 1, first[0]]);
    }
  }

  registerHit(y, x, gameBoard) {
    if (gameBoard.arr[y][x] === null) {
      this.lastHit.push([y, x]);
    }
  }
}

module.exports = { Player, Computer };
