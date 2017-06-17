// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing articles.
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pubDate: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    saveDate: {
        type: Date,
        required: true
    }
});

// Create the Model
var Article = mongoose.model("Article", ArticleSchema);

// Export it for use elsewhere
module.exports = Article;
