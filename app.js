const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const conn = require("./db/conn");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const auth = require("./router/auth");

app.use("/auth", auth);

//quando nao encontra rota
app.use((req, res, next) => {
  const erro = new Error("Not found");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({ erro: { message: error.massage } });
});

module.exports = app;
