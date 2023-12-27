import { tetrominoColors } from "./ColorsConfig";

const Tetrominos = {
  0: { shape: [[0]], color: "0, 0, 0" }, // Empty cell
  I: {
    shapes: [
      [
        [0, 0, 0, 0],
        ["I", "I", "I", "I"],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, "I", 0, 0],
        [0, "I", 0, 0],
        [0, "I", 0, 0],
        [0, "I", 0, 0],
      ],
      [
        [0, 0, 0, 0],
        ["I", "I", "I", "I"],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, "I", 0, 0],
        [0, "I", 0, 0],
        [0, "I", 0, 0],
        [0, "I", 0, 0],
      ],
    ],
    color: tetrominoColors.I,
  },
  J: {
    shapes: [
      [
        [0, "J", 0],
        [0, "J", 0],
        ["J", "J", 0],
      ],
      [
        ["J", 0, 0],
        ["J", "J", "J"],
        [0, 0, 0],
      ],
      [
        [0, "J", "J"],
        [0, "J", 0],
        [0, "J", 0],
      ],
      [
        [0, 0, 0],
        ["J", "J", "J"],
        [0, 0, "J"],
      ],
    ],
    color: tetrominoColors.J,
  },
  L: {
    shapes: [
      [
        [0, "L", 0],
        [0, "L", 0],
        [0, "L", "L"],
      ],
      [
        [0, 0, 0],
        ["L", "L", "L"],
        ["L", 0, 0],
      ],
      [
        ["L", "L", 0],
        [0, "L", 0],
        [0, "L", 0],
      ],
      [
        [0, 0, "L"],
        ["L", "L", "L"],
        [0, 0, 0],
      ],
    ],
    color: tetrominoColors.L,
  },
  O: {
    shapes: [
      // Rotation does not affect the shape of 0
      [
        ["O", "O"],
        ["O", "O"],
      ],
      [
        ["O", "O"],
        ["O", "O"],
      ],
      [
        ["O", "O"],
        ["O", "O"],
      ],
      [
        ["O", "O"],
        ["O", "O"],
      ],
    ],
    color: tetrominoColors.O,
  },
  S: {
    shapes: [
      [
        [0, "S", "S"],
        ["S", "S", 0],
        [0, 0, 0],
      ],
      [
        [0, "S", 0],
        [0, "S", "S"],
        [0, 0, "S"],
      ],
      [
        [0, 0, 0],
        [0, "S", "S"],
        ["S", "S", 0],
      ],
      [
        ["S", 0, 0],
        ["S", "S", 0],
        [0, "S", 0],
      ],
    ],
    color: tetrominoColors.S,
  },
  T: {
    shapes: [
      [
        [0, "T", 0],
        ["T", "T", "T"],
        [0, 0, 0],
      ],
      [
        [0, "T", 0],
        [0, "T", "T"],
        [0, "T", 0],
      ],
      [
        [0, 0, 0],
        ["T", "T", "T"],
        [0, "T", 0],
      ],
      [
        [0, "T", 0],
        ["T", "T", 0],
        [0, "T", 0],
      ],
    ],
    color: tetrominoColors.T,
  },
  Z: {
    shapes: [
      [
        ["Z", "Z", 0],
        [0, "Z", "Z"],
        [0, 0, 0],
      ],
      [
        [0, 0, "Z"],
        [0, "Z", "Z"],
        [0, "Z", 0],
      ],
      [
        [0, 0, 0],
        ["Z", "Z", 0],
        [0, "Z", "Z"],
      ],
      [
        [0, "Z", 0],
        ["Z", "Z", 0],
        ["Z", 0, 0],
      ],
    ],
    color: tetrominoColors.Z,
  },
};

export default Tetrominos;
