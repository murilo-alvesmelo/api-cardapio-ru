const express = require("express");
const app = express();
const db = require("./config/db");
const consign = require("consign");
const port = 5000;

consign().then("./config/middlewares.js").into(app);

app.db = db;

app.get("/", (req, res) => {
  res.status(200).send("Bem-Vindo ao Express !");
});

app.listen(port, () => {
  console.log("Servidor escutando na porta", port);
});
