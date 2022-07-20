var express=require("express");
var route= express.Router();
var passport=require("passport");
var user=require("../models/user");


route.get("/",function(req,res)
{
    res.render("amp");
});

route.get("/register",function(req,res)
    {
        res.render("register");
    });
route.post("/register",function(req,res)
    {
       var newuser=new user({username: req.body.username});
       user.register(newuser,req.body.password,function(err,user){
           if(err)
           {
               console.log(err);
               return res.render("register")
           }
           passport.authenticate("local")(req,res,function(){
               res.redirect("/campground");
           });
       });
    });
route.get("/login",function(req,res)
    {
        res.render("login",);
    });
route.post("/login", passport.authenticate("local",
 {
     
 
     successRedirect: "/campground",
     failureRedirect: "/login"
 })   ,
 function(req,res){
  
 });
route.get("/logout",function(req,res){
    
     req.logout();
     req.flash("success","Logged you out!");
     res.redirect("/campground");
 });
 function isLoggedIn(req,res,next)
 {
     if(req.isAuthenticated())
     {
         return next();
     }
     res.redirect("/login");
 };
 module.exports = route;