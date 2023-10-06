const { Ship } = require("./ship");

const titan = new Ship(3);
titan.hits = 3;

test("check if ship has been sunk", () => {
  expect(titan.isSunk()).toBe(true);
});

test("check that ship hits are being updated", () => {
  expect(titan.hit()).toBe(4);
});
