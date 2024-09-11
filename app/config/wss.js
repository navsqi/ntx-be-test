const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({
  noServer: true,
  path: "/websocket",
});

module.exports = wss;
