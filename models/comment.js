
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    body: {
        type: String
    },
    title: {
        type: String
    }
})

let Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;