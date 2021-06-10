const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const Cache = require("../cacheutility");
const UserController = require("../controllers/UserController");

router.post("/user/", UserController.store);
router.get("/user/:userId",Cache.getCache, UserController.show);
router.get("/user/:userId/posts",Cache.getCache, UserController.getUserPosts);
router.get("/post", Cache.getCache, PostController.index);
router.get("/post/:postId", Cache.getCache, PostController.show);
router.patch("/post/:postId", PostController.updatePost);
router.patch("/user/:userId", UserController.updateUser);
router.post("/post", PostController.store);

module.exports = router;
