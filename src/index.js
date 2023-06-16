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
  console.info("Handling canary get. connectCheckID =", req.query.id);
  res.send("hello");
  res.end();
});

app.ws("/canary/websocket", function (ws, req) {
  console.info(
    "Handling canary websocket. connectCheckID =",
    req.query.id,
    ", wSecWebSocketProtocolHeader =",
    req.query.wSecWebSocketProtocolHeader
  );
  console.info("Sending hello message");
  ws.send("hello");
  let closed = false;
  const onClose = () => {
    console.info("Socket closed.");
    closed = true;
    ws.removeEventListener("close", onClose);
  };
  ws.addEventListener("close", onClose);
  setTimeout(() => {
    if (!closed) {
      console.info("Closing socket.");
      closed = true;
      ws.removeEventListener("close", onClose);
      ws.close();
    }
  }, 10_000);
});

app.listen(3000);
