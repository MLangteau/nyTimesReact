// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing articles.
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    articleDate: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    dateSaved: {
        type: date,
        required: true
    }
});

// Create the Model
var Article = mongoose.model("Article", ArticleSchema);

// Export it for use elsewhere
module.exports = Article;
