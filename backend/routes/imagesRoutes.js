import express from "express";
import * as imagesController from "../controllers/imagesController.js";

const router = express.Router();

router
  .route("/")
  //GET all image/post
  .get(imagesController.getImages)

  //POST a new image/post
  .post(imagesController.createNewPost);

router
  .route("/:id")
  //GET a specific image/post
  .get(imagesController.getImage)

  //DELETE a specific image/post
  .delete(imagesController.deletePost);

// Route to Update the LIKES property of an image
router.route("/:id/like").put(imagesController.likeImage);

export default router;
