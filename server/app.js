const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://shen:123456q@cluster0-q9gpp.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);
mongoose.connection
  .once("open", () => {
    console.log("connected to database");
  })
  .on("error", error => {
    console.log("Connection error:", error);
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
