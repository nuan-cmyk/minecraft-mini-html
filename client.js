
const socket = io();

let players = {};
let myId = null;

socket.on("init", id => {
  myId = id;
});

socket.on("update", data => {
  players = data;
  render();
});

function move(direction) {
  socket.emit("move", direction);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") move("forward");
  if (e.key === "ArrowDown") move("backward");
  if (e.key === "ArrowLeft") move("left");
  if (e.key === "ArrowRight") move("right");
});

function render() {
  const canvas = document.querySelector("canvas") || document.body.appendChild(document.createElement("canvas"));
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  Object.keys(players).forEach(id => {
    const p = players[id];
    ctx.fillStyle = id === myId ? "lime" : "white";
    ctx.fillRect(p.x, p.y, 20, 20);
  });
}
