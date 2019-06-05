var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db = process.env.MONGODB_URI || "mongodb://localhost/scrape_cancer";

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
var router = express.Router();

require("./config/routes")(router);

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(router);

// Connect to the Mongo DB
mongoose.connect(db, { useNewUrlParser: true }, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Mongoose connection is successful!");
  }
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port http://localhost:" + PORT);
}) ;
