import React, { useState } from "react";

const grid = [
  ["", "", "■", "", "", "", "", ""],
  ["", "■", "", "", "■", "", "", ""],
  ["", "", "", "■", "", "", "", ""],
  ["■", "", "", "", "", "■", "", ""],
  ["", "", "■", "", "", "", "■", ""],
  ["", "", "", "", "■", "", "", ""],
  ["", "■", "", "", "", "", "", "■"],
  ["", "", "", "■", "", "", "", ""],
];

const clues = {
  across: {
    "1": "Corrida, em inglês",
    "5": "Antiga profissão de Chico Anysio",
  },
  down: {
    "1": "Antiga profissão de Chico Anysio",
    "2": "Corrida, em inglês",
  },
};

export default function Crossword() {
  const [cells, setCells] = useState(
    grid.map((row) => row.map((cell) => (cell === "■" ? "■" : "")))
  );
  const [selected, setSelected] = useState(null);
  const [direction, setDirection] = useState("across");

  const handleCellClick = (row, col) => {
    if (grid[row][col] === "■") return;
    if (selected?.row === row && selected?.col === col) {
      // Alterna entre horizontal e vertical ao clicar na mesma célula
      setDirection(direction === "across" ? "down" : "across");
    }
    setSelected({ row, col });
  };

  const handleInput = (e, row, col) => {
    const val = e.target.value.toUpperCase().slice(-1);
    setCells((prev) =>
      prev.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? val : c))
      )
    );
  };

  const isHighlighted = (row, col) => {
    if (!selected) return false;
    if (direction === "across" && row === selected.row && grid[row][col] !== "■") {
      return true;
    }
    if (direction === "down" && col === selected.col && grid[row][col] !== "■") {
      return true;
    }
    return false;
  };

  const currentClue =
    selected &&
    (direction === "across"
      ? clues.across[selected.row + 1] || ""
      : clues.down[selected.col + 1] || "");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-8 gap-1">
        {cells.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-10 h-10 flex items-center justify-center border text-lg font-bold ${
                grid[i][j] === "■"
                  ? "bg-black"
                  : isHighlighted(i, j)
                  ? "bg-yellow-200"
                  : "bg-white"
              }`}
              onClick={() => handleCellClick(i, j)}
            >
              {grid[i][j] === "■" ? null : (
                <input
                  className="w-full h-full text-center outline-none bg-transparent"
                  maxLength={1}
                  value={cells[i][j]}
                  onChange={(e) => handleInput(e, i, j)}
                />
              )}
            </div>
          ))
        )}
      </div>
      <div className="p-2 bg-gray-100 rounded w-80 text-center">
        <strong>Dica:</strong> {currentClue || "Clique em uma célula"}
      </div>
    </div>
  );
}