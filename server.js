var express = require("express");
var expressHandlebars = require("express-handlebars");
// var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Our scraping tools
// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models
// var db = require("./models");
var db = process.env.MONGODB_URI || "mongodb://localhost/scrape_cancer";

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
var router = express.Router();

require("./config/routes")(router);

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));

// Configure middleware
// app.use(logger("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(router);

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/scrape-cancer", { useNewUrlParser: true });
mongoose.connect(db, { useNewUrlParser: true }, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Mongoose connection is successful!");
  }
});

    // // Routes

    // // A GET route for scraping the cancer website 
    // app.get("/scrape", function(req, res) {
    //   axios.get("https://www.medicalnewstoday.com/categories/colorectal_cancer").then(function(response) {
    //     var $ = cheerio.load(response.data);

    //     $(".headline").each(function(i, element) {
    //       var result = {};

    //       result.title = $(this)
    //         .parent()
    //         .attr("title");
    //       result.summary = $(this)
    //         .find("em")
    //         .text();
    //       result.imageurl = $(this)
    //         .parent()
    //         .find("img")
    //         .attr("data-src");
    //       result.link = "https://www.medicalnewstoday.com" + $(this)
    //         .parent()
    //         .attr("href");

    //       db.Article.create(result)
    //         .then(function(dbArticle) {
    //           console.log(dbArticle);
    //         })
    //         .catch(function(err) {
    //           console.log(err);
    //         });
    //       return i<9;
    //     });
    //     res.send("Scrape Complete");
    //   });
    // });

    // // Route for getting all Articles from the db
    // app.get("/articles", function(req, res) {
    //   db.Article.find({})
    //     .then(function(dbArticle) {
    //       res.json(dbArticle);
    //     })
    //     .catch(function(err) {
    //       res.json(err);
    //     });
    // });

    // // Route for grabbing a specific Article by id, populate it with it's note
    // app.get("/articles/:id", function(req, res) {
    //   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    //   db.Article.findOne({ _id: req.params.id })
    //     // ..and populate all of the notes associated with it
    //     .populate("note")
    //     .then(function(dbArticle) {
    //       // If we were able to successfully find an Article with the given id, send it back to the client
    //       res.json(dbArticle);
    //     })
    //     .catch(function(err) {
    //       // If an error occurred, send it to the client
    //       res.json(err);
    //     });
    // });

    // // Route for saving/updating an Article's associated Note
    // app.post("/articles/:id", function(req, res) {
    //   // Create a new note and pass the req.body to the entry
    //   db.Note.create(req.body)
    //     .then(function(dbNote) {
    //       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
    //       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    //       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    //       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    //     })
    //     .then(function(dbArticle) {
    //       // If we were able to successfully update an Article, send it back to the client
    //       res.json(dbArticle);
    //     })
    //     .catch(function(err) {
    //       // If an error occurred, send it to the client
    //       res.json(err);
    //     });
    // });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port http://localhost:" + PORT);
});
