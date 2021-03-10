const express    = require("express"),
      ejs        = require("ejs"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      seedDB     = require("./seeds");


const app = express();

seedDB();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res) {
    var newCampName = req.body.newCampName;
    var newCampImg = req.body.newCampImg;
    var newCampDesc = req.body.newCampDesc;
    var newCampground = {name: newCampName, img: newCampImg, description: newCampDesc}
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
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function() {
    console.log("Server running on port 3000.");
});