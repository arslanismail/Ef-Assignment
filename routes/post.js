const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const Cache = require("../cacheutility");


router.get("/", Cache.getCache, PostController.index);
router.get("/:postId", Cache.getCache, PostController.show);
router.post("/", PostController.store);

module.exports = router;
