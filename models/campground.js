const mongoose = require("mongoose");

// SCHEMA SETUP
const campgroundSchema = mongoose.Schema({
    name: String,
    img: String,
    description: String
});

 module.exports = mongoose.model("Campground", campgroundSchema);