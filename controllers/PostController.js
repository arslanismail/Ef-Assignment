const Post = require("../models/Post");
const Cache = require("../cacheutility");


const index = (req, res, next) => {
  Post.find().populate('user').exec( function(err, posts){
    if(err){
      res.json({error:err.message})
      console.log(err);
    }
    Cache.setCache(req.originalUrl, posts);
    res.json(posts); 
  });
};

const show = (req, res, next) => {
  let postId = req.params.postId;
  Post.findById(postId).populate('user').exec( function(err, post){
    if(err){
      res.json({error:err.message})
      console.log(err);
    }
    Cache.setCache(req.originalUrl, post);
    res.json(post); 
  });
};

const store = (req, res, next) => {
  let post = new Post({
    user: req.body.userId ? req.body.userId : appSession.userId,
    title: req.body.title,
    content: req.body.content
  });
  post
    .save()
    .then((response) => {
      Cache.delCache(req.originalUrl);
      res.json({
        message: "Post Added Succesfully",
        data: response
      });
    })
    .catch((err) => {
      res.json({
        message: "Something Went Wrong While Adding The Post",
        error: err.message
      });
    });
};

const updatePost = (req, res, next) => {
  let postId = req.params.postId;
  let updatedPost = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.findByIdAndUpdate(postId, { $set: updatedPost })
    .then((response) => {
      Cache.delCache(req.originalUrl);
      res.json({
        message: "Updated Successfully"
      });
    })
    .catch((error) => {
        console.log(error)
      res.json({
        message: "Error Occered While Updating",
        error: error.message
      });
    });
};



module.exports = {
  index,
  show,
  store,
  updatePost,
};
