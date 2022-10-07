const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://user:Gd3WsE9wQPgC0AUh@atlascluster.bp6flwt.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("Conectamos ao Mongoose!");
}
main().catch((err) => console.log(err));

module.exports = mongoose;
