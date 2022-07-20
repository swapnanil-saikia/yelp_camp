var mongoose=require("mongoose");
var campground=require("./models/campground");
var comment=require("./models/comment");



var data=[
    {name: "cloud's rest",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9Erg1gQb2QrCtnYS7hUygRmXtvRxu5smBOVQuWUNd1rxOUWP",
       description: "blah blah blah"
    },
    {name: "cloud's rest",
      image: "https://yelpcamp.timothyclark.co.uk/images/salmon_creek.jpg",
       description: "blah blah blah"
    },
    {name: "cloud's rest",
      image: "https://cdn3.f-cdn.com//files/download/79961751/3fd811.jpg",
       description: "blah blah blah"
    }
]
function seedDB(){
    campground.remove({},function(err){
        // if(err){
        //          console.log(err);}
        //              console.log("removedcampgrounds");
        //              data.forEach(function(seed){
        //                 campground.create(seed,function(err,campground){
        //                     if(err){
        //                         console.log(err);
        //                     }else{
        //                         console.log("added a new");
        //                             comment.create(
        //                     {
        //                         text: "this place is great",
        //                         author: "honor"
        //                     },function(err,comment){
        //                         if(err){
        //                             console.log(err);
        //                         }else{
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                         console.log("creted new comment");}
        //                     }
        //                 );
        //             }});
        //         })
                 
            });} 
module.exports=seedDB;
