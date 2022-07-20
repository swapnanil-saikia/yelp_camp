var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodoverride = require("method-override");
var dotenv = require('dotenv')
var campground = require("./models/campground");
var comment = require("./models/comment");
var user = require("./models/user");
var seedDB = require("./seeds");
var commentroute = require("./route/comment");
var campgroundsroute = require("./route/campground");
var authroute = require("./route/auth");

dotenv.config({ path: './config.env' })

// const db = process.env.DATABASE;
// console.log(process.env)
const db = require('./config/Config').mongoURI;
mongoose.connect(db).then(
    console.log("coneen")
)

app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));
// seedDB();
app.use(flash());
app.use(require("express-session")(
    {
        secret: "bag",
        resave: false,
        saveUninitialized: false
    }
));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function (req, res, next) {
    res.locals.currentuser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// mongoose.connect("mongodb://localhost/yelp_camp");



// var campgroundSchema=new mongoose.Schema(
//     {
//         name:String,
//         image:String,
//         description:String
//     }
// );
// var campground= mongoose.model("campground", campgroundSchema);

app.use(bodyparser.urlencoded(
    { extended: true }
));



app.set("view engine", "ejs");


app.use(authroute);
app.use(campgroundsroute);
app.use(commentroute);
app.listen(process.env.PORT || 10000, function () {
    console.log("hi");
});