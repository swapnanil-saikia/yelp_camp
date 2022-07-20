const express=require("express");
const route= express.Router();
const campground=require("../models/campground");
const middleware=require("../middleware");


route.get("/campground", (req,res)=>
{

    campground.find({}, (err,allcampground)=>{
    if(err){
        console.log(err);
    }
    else{
        
        res.render("campgrounds",{campgrounds:allcampground, currentuser: req.user});   
        
    }});});
route.post("/campground",middleware.isLoggedIn,(req,res)=>
{
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var price=req.body.price;
    var author={
        id: req.user._id,
        username: req.user.username
    }
    var newcampground={name:name,image:image,description:description,price:price,author:author};
    campground.create(newcampground, (err,newlycreated)=>
{
    if(err)
    { }
    else
    {res.redirect("/campground");}
});

});
route.get("/campground/new",middleware.isLoggedIn, (req,res)=>{


    res.render("n.ejs");});
route.get("/campground/:id",(req,res)=>
{
    campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground)
    {
        if(err)
        {
            console.log(err);
        }else
        {
            console.log(foundcampground);
            res.render("show.ejs", {campground: foundcampground});
        
    }
    

});});
route.get("/campground/:id/edit",middleware.checkownership,function(req,res)
{
    
        campground.findById(req.params.id, function(err,foundcampground)

        {
                res.render("campgrounds/edit", {campground: foundcampground});
    
        })
});

route.put("/campground/:id",middleware.checkownership, function(req,res)
{
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground)
    {
        if(err)
        {
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground/" + req.params.id);
        }
    });
});
route.delete("/campground/:id",middleware.checkownership,function(req,res)
{  
    campground.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            res.redirect("/campground");
        }else{
            res.redirect("/campground");
        }
    });
});



module.exports = route;