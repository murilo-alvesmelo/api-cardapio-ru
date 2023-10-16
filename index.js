const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Bem-Vindo ao Express !");
});

app.listen(5000, () => {
  console.log("Servidor escutando na porta 5000");
});
