const mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment");

const data = [
    {
        name: "Desert Hill",
        img: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhbXBpbmd8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Blah blah blah blah blah"
    },
    {
        name: "Gipsy´s Bay",
        img: "https://images.unsplash.com/photo-1495685288924-ce05d1036b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fGNhbXBpbmd8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Blah blah blah blah blah"
    },
    {
        name: "Moonlight Side",
        img: "https://images.unsplash.com/photo-1513476395295-fcf532934d17?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDl8fGNhbXBpbmd8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Blah blah blah blah blah"
    }
]

function seedDB() {
    // Erase database
    Campground.deleteMany({}, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all campgrounds");
            // Create initial campgrounds
            seedCampgrounds();
        }
    });
}

// Create initial campgrounds
function seedCampgrounds() {
    data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log("Campgrounds added successfully");
                seedComments();
            }
        });
    });
}

function seedComments() {
    Comment.create(
        {
            text: "This place is awesome",
            author: "Homer"
        }, function(err, comment) {
            if (err) {
                console.log(err);
            } else {
                campground.comment.push(comment);
                campground.save();
                console.log("Created new comment");
            }
        });
}

module.exports = seedDB;