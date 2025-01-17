const express = require("express");
const forumsController = require("../controllers/forumsController");

const router = express.Router();

router.route("/updateLikeCounter").patch(forumsController.updateLikeCounter);
router.route("/addComment").patch(forumsController.addComment);
router.route("/reports").get(forumsController.getReports);

router
  .route("/")
  .post(forumsController.createPost)
  .get(forumsController.getAllPosts);

router
  .route("/:id")
  .get(forumsController.getPost)
  .patch(forumsController.updatePost)
  .delete(forumsController.deletePost);

module.exports = router;
