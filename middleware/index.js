var middleware={};
var campground=require("../models/campground");
var comment=require("../models/comment");
middleware.checkownership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        campground.findById(req.params.id, function(err,foundcampground)
    {
        if(err)
        {
              res.redirtect("back");
        } else{
            if(foundcampground.author.id.equals(req.user._id)){
                next();
            }
            else{
                res.redirect("back");
            }
        }
    });
    }
    else{
        res.redirect("back");
    }
}
middleware.checkcommentownership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        comment.findById(req.params.comment_id, function(err,foundcomment)
    {
        if(err)
        {
              res.redirtect("back");
        } else{
            if(foundcomment.author.id.equals(req.user._id)){
                next();
            }
            else{
                res.redirect("back");
            }
        }
    });
    }
    else{
        res.redirect("back");
    }
}
middleware.isLoggedIn=function(req,res,next)
 {
     if(req.isAuthenticated())
     {
         return next();
     }
     req.flash("error","Please Login First!");
     res.redirect("/login");
 };
 module.exports=middleware;