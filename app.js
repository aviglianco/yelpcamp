const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var campgrounds = [
    {
        name: "Salmon Creek", 
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.outdoorproject.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fcboxshow%2Fpublic%2F1465451402%2Fdscf9450.jpg%3Fitok%3DnoymVSgN&f=1&nofb=1"
    },
    {
        name: "Granite Hill",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.itc-us.com%2Fwp-content%2Fuploads%2F2016%2F12%2Fcamping-tent-mountains.jpg&f=1&nofb=1"
    },
    {
        name: "Mount Rushmore",
        img: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
];

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {
        campgrounds: campgrounds
    });
});

app.post("/campgrounds", function(req, res) {
    var newCampName = req.body.newCampName;
    var newCampImg = req.body.newCampImg;
    var newCampground = {name: newCampName, img: newCampImg}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new-camp");
})

app.listen(3000, function() {
    console.log("Server running on port 3000.");
});