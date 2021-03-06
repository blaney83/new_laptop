
const mongoose = require("mongoose");

const Schema = mongoose.Schema

let productSchema = new Schema({

    title: {
        type: String,
        // required: true
    },
    link: {
        type: String,
        // required: true
    },
    aveRating: {
        type: String,
        required: false
    },
    msrp: {
        type: Number,
        required: false
    },
    currentPrice: {
        type: Number,
        required: false
    },
    openBoxPrice: {
        type: Number,
        required: false
    },
    savingsPercent: {
        type: Number,
        required: false
    },
    savingsAmount: {
        type: Number,
        required: false
    },
    lowestPrice: {
        type: Number,
        required: false
    },
    model: {
        type: String,
        // required: true
    },
    sku: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        // required: true
    },
    saved: {
        type: Boolean,
        // required: true,
        default: false
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

let Product = mongoose.model("product", productSchema);

module.exports = Product;

