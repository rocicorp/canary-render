var express = require("express");
var app = express();
var cors = require("cors");
var expressWs = require("express-ws")(app);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/canary/get", cors(), function (req, res, next) {
  console.info(
    "/canary/get",
    "connectCheckID =",
    req.query.id,
    "Handling canary get."
  );
  res.send("hello");
  res.end();
});

app.ws("/canary/websocket", function (ws, req) {
  const log = (...args) =>
    console.info(
      "/canary/websocket",
      "connectCheckID =",
      req.query.id,
      "wSecWebSocketProtocolHeader =",
      req.query.wSecWebSocketProtocolHeader,
      ...args
    );
  log("Handling canary websocket.");
  log("Sending hello message");
  ws.send("hello");
  let closed = false;
  const onClose = () => {
    log("Socket closed.");
    closed = true;
    ws.removeEventListener("close", onClose);
  };
  ws.addEventListener("close", onClose);
  setTimeout(() => {
    if (!closed) {
      log("Closing socket.");
      closed = true;
      ws.removeEventListener("close", onClose);
      ws.close();
    }
  }, 10000);
});

app.listen(3000);
