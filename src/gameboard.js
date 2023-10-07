const { Ship } = require("./ship");

class Gameboard {
  constructor() {
    this.arr = createArray();
    this.ships = [];
  }

  receiveAttack(y, x) {
    if (this.arr[y][x] instanceof Ship) {
      this.arr[y][x].hit();
      this.arr[y][x] = null;
    } else {
      this.miss(y, x);
    }
    return this.arr;
  }

  miss(y, x) {
    this.arr[y][x] = 1;
  }

  allShipsSunk() {
    let i = 0;
    while (i < this.ships.length) {
      if (!this.ships[i].isSunk()) {
        return false;
      }
      i++;
    }
    return true;
  }

  placeShip(y, x, axis, length, ship = new Ship(length)) {
    let i = 0;
    let p = axis === "y" ? y : x;

    while (i < ship.length) {
      if (axis === "y") {
        this.arr[p][x] = ship;
      } else {
        this.arr[y][p] = ship;
      }
      p++;
      i++;
    }
    this.ships.push(ship);
  }
}

function createArray() {
  const arr = new Array(10);

  for (let i = 0; i < 10; i++) {
    arr[i] = new Array(10).fill(0);
  }

  return arr;
}

module.exports = { Gameboard };
