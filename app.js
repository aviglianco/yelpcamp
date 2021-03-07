const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});


// SCHEMA SETUP
const campgroundSchema = mongoose.Schema({
    name: String,
    img: String,
    description: String
});

 const Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res) {
    var newCampName = req.body.newCampName;
    var newCampImg = req.body.newCampImg;
    var newCampground = {name: newCampName, img: newCampImg}
    Campground.create(newCampground, function(err, newCamp) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new-camp");
})

app.listen(3000, function() {
    console.log("Server running on port 3000.");
});