var express=require("express");
var route= express.Router();
var campground =require("../models/campground");
var comment =require("../models/comment");
var middleware=require("../middleware");


route.get("/campground/:id/comment/new",middleware.isLoggedIn,function(req,res)
{
    campground.findById(req.params.id,function(err,campground)
    {
        if(err){
            console.log(err);
        }else {
            res.render("comments/new",{campground:campground});
        };
        }
    );});
    route.post("/campground/:id/comment",middleware.isLoggedIn,function(req,res){
        campground.findById(req.params.id,function(err,campground){
            if(err)
            {
                console.log(err);
                res.redirect("/campground");
            }
            else{
                comment.create(req.body.comment,function(err,comment){
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        res.redirect('/campground/' + campground._id);
                    }
                })
            }
        })
    });
route.get("/campground/:id/comment/:comment_id/edit",middleware.checkcommentownership,function(req,res)
{
    comment.findById(req.params.comment_id,function(err,foundcomment)
    {
        if(err)
        {
             res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundcomment});
        }
    });
     
});
route.put("/campground/:id/comment/:comment_id",middleware.checkcommentownership,function(req,res)
{
     comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment)
     {
         if(err)
         {
             res.redirect("back");
         }
         else

         {
             res.redirect("/campground/" + req.params.id);
         }
     });
});
route.delete("/campground/:id/comment/:comment_id",middleware.checkcommentownership,function(req,res)
{
    comment.findByIdAndRemove(req.params.comment_id,function(err)
    {
        if(err)
        {
            res.redirect("back");
        }
        else
        {
                res.redirect("/campground/" + req.params.id);
        }
    });
});
    
 
    module.exports = route;