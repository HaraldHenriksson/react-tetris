import Game from "../game/page";

export default function DoubleGame() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Game controls="wasd" />
      <Game controls="arrows" />
    </div>
  );
}
