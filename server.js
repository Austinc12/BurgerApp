var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var db = require("./Models");
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => {
    console.log("Connected to Mongo");
  }
);
app.use(require("./Routes/Api-routes.js"));
app.use(require("./Routes/htmlroutes.js"));

app.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}!`);
});