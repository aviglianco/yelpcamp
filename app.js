const express    = require("express"),
      ejs        = require("ejs"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      seedDB     = require("./seeds");


const app = express();

seedDB();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

// ROUTES
app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// NEW campground
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

// NEW campground form
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// SHOW each campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// COMMENT ROUTES
// NEW Comment
app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

// NEW comment form
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});



app.listen(3000, function() {
    console.log("Server running on port 3000.");
});