
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

const players = {};

io.on("connection", socket => {
  players[socket.id] = { x: 100, y: 100 };
  socket.emit("init", socket.id);

  socket.on("move", dir => {
    const p = players[socket.id];
    if (!p) return;
    if (dir === "left") p.x -= 10;
    if (dir === "right") p.x += 10;
    if (dir === "forward") p.y -= 10;
    if (dir === "backward") p.y += 10;
    io.emit("update", players);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("update", players);
  });

  io.emit("update", players);
});

http.listen(process.env.PORT || 3000, () => console.log("Server running"));
