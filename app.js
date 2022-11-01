const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const auth = require("./routes/auth");
const user = require("./Routes/user");
const product = require("./Routes/product");
const order = require("./Routes/order");
const cart = require("./Routes/cart");
const stripe = require("./Routes/stripe");

app.use("/auth", auth);
app.use("/user", user);
app.use("/product", product);
app.use("/order", order);
app.use("/cart", cart);
app.use("/stripe", stripe);

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
