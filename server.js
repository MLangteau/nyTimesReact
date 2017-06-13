// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article Schema
// var Article = require("./models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nyTimesReaction");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

    // We will find all the records, sort it in descending order, then limit the records to 5
    Article.find({}).sort([
        ["date", "descending"]
    ]).limit(5).exec(function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
    console.log("BODY-title: " + req.body.title);
    console.log("BODY-articleDate: " + req.body.articleDate);
    console.log("BODY-url: " + req.body.url);
    console.log("BODY-dateSaved: " + req.body.dateSaved);
    // Here we'll save the location based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Article.create({
        title: req.body.title,
        articleDate: req.body.articleDate,
        url: req.body.url,
        dateSaved: Date.now()
    }, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Saved Search");
        }
    });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
