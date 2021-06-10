const User = require("../models/User");
const Post = require("../models/Post");
const Cache = require("../cacheutility");
const mongoose = require("mongoose");

const store = (req, res, next) => {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
  });
  user
    .save()
    .then((response) => {
      appSession= req.session;
      appSession.userId = user._id 
      res.json({
        message: "User Added Succesfully",
        data: response
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Something Went Wrong While Adding The User",
        error:err.message
      });
    });
};

const show = (req, res, next) => {
  let userId = req.params.userId;
  User.findById(userId).exec( function(err, user){
    if(err){
      console.log(err);
      res.json({error:err.message})
    }
    Cache.setCache(req.originalUrl, user);
    res.json(user); 
  });
};

const updateUser = (req, res, next) => {
  let userId = req.params.userId;
  let updatedUser = {
   ...req.body
  };
  User.findByIdAndUpdate(userId, { $set: updatedUser })
    .then((response) => {
      Cache.delCache(req.originalUrl);
      res.json({
        message: "Updated Successfully"
      });
    })
    .catch((error) => {
      console.log(error)
      res.json({error:error.message});
    });
};


const getUserPosts = (req, res, next) => {
  let userId = req.params.userId;
  Post.find({user:mongoose.Types.ObjectId(userId)})
  .then((response) => {
    Cache.setCache(req.originalUrl,response);
    res.json(response);
  })
  .catch((error) => {
    console.log(error)
    res.json({error:error.message});
  });
  
};



module.exports = {
  show,
  store,
  updateUser,
  getUserPosts
};
