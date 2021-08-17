const express = require("express");
const path = require("path");
const app = express();
const gameRoutes = require("./routes/game");

app.listen(3000, () => {
  console.log("server is listening at 127.0.0.1:3000");
});

app.use(express.static(path.join(__dirname, "public")));

gameRoutes(app);
