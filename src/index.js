var express = require("express");
var app = express();
var cors = require("cors");
var expressWs = require("express-ws")(app);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/hello", cors(), function (req, res, next) {
  res.send("world");
  res.end();
});

app.ws("/", cors(), function (ws, req) {
  ws.on("hello", function (msg) {
    res.send("world");
  });
});

app.listen(3000);
