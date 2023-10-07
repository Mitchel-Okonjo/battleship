const { Ship } = require("./ship");
const { Gameboard } = require("./gameboard");
const { Player } = require("./player");

const titan = new Ship(3);
titan.hits = 3;
const gameBoard = new Gameboard();

test("Correctly determine if ship has sunk", () => {
  expect(titan.isSunk()).toBe(true);
});

test("Correctly update ship hits", () => {
  expect(titan.hit()).toBe(4);
});

test("Correctly creates 10 by 10 array", () => {
  expect(gameBoard.arr[9][9]).toBe(0);
  gameBoard.arr[0][0] = 1;
  expect(gameBoard.arr[0][0]).toBe(1);
});

test("Correctly identifies successful attack", () => {
  gameBoard.arr[9][9] = titan;
  gameBoard.receiveAttack(9, 9);
  expect(titan.hits).toBe(5);
  expect(gameBoard.arr[9][9]).toBeNull();
});

test("Correctly identifies Missed shots", () => {
  gameBoard.miss(8, 9);
  expect(gameBoard.arr[8][9]).toBe(1);
});

test("Correclty places ships ", () => {
  gameBoard.placeShip(1, 0, "y", 2);
  expect(gameBoard.arr[1][0]).toEqual(new Ship(2));
  expect(gameBoard.arr[1][1]).toBe(0);
  expect(gameBoard.arr[2][0]).toEqual(gameBoard.arr[1][0]);
  expect(gameBoard.arr[3][0]).toBe(0);
});

test("Corrently determine if all ships are sunk", () => {
  const spartan = new Ship(3);
  const spartan2 = new Ship(2);
  spartan.hits = 3;
  gameBoard.ships = [];
  gameBoard.ships.push(spartan);
  gameBoard.ships.push(spartan2);
  expect(gameBoard.allShipsSunk()).toBeFalsy();
  gameBoard.ships[1].hits = 2;
  expect(gameBoard.allShipsSunk()).toBeTruthy();
});

test("Attacks opponents game board", () => {
  gameBoard.placeShip(6, 0, "y", 3);
  const player = new Player();
  player.attack(6, 0, gameBoard);
  expect(gameBoard.arr[7][0].hits).toBe(1);
});
