// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article Schema
var Article = require("./models/Article");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

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

// -------------------------------------------------------------------
// MongoDB Configuration configuration (Change the URL to current DB)
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
else {
    mongoose.connect('mongodb://localhost/nyTimesReaction');
};

// store mongoose connection to the db variable
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
app.get("/api/saved", function(req, res) {
    console.log("Made it to finding the records");
    // We will find all the records, sort it in descending order, then limit the records to 5
    Article.find({}).sort([
        ["saveDate", "descending"]
    ]).limit(5).exec(function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("got saved Articles from MongoDB");
            res.send(doc);
        }
    });
});

// This is the route we will send POST requests to save each search.
app.post("/api/saved", function(req, res) {
    console.log("BODY-pubDate: " + req.body.pubDate + " BODY-title: " + req.body.title + " BODY-url: " + req.body.url);
    // Here we'll save the article based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Article.create({
        pubDate: req.body.pubDate,
        title: req.body.title,
        url: req.body.url,
        saveDate: Date.now()
    }, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Saved Search");
        }
    });
});

// This is the route we will send DELETE requests to remove the selected article.
app.delete("/api/saved/:id", function(req, res) {
    console.log("IN THE delete/remove req.params: ", req.params);
    // Here we'll remove the article based on the JSON input.

    Article.remove({
        _id: req.params.id,
    }, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Removed");
        }
    });
});

// Main "/" Route. This will redirect the user to our rendered React application
app.use("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
