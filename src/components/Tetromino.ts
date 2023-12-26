import { tetrominoColors } from "./ColorsConfig";

const Tetrominos = {
  0: { shape: [[0]], color: "0, 0, 0" }, // Empty cell
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: tetrominoColors.I,
  },

  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: tetrominoColors.J,
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: tetrominoColors.L,
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: tetrominoColors.O,
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: tetrominoColors.S,
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: tetrominoColors.T,
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: tetrominoColors.Z,
  },
};

export default Tetrominos;
