import express from "express";
import * as imagesController from "../controllers/imagesController.js";

const router = express.Router();

router
  .route("/")
  // GET all image/post
  .get(imagesController.getImages)
  // POST a new image/post
  .post(imagesController.createNewPost);

router
  .route("/:id")
  // GET a specific image/post
  .get(imagesController.getImage)
  // DELETE a specific image/post
  .delete(imagesController.deletePost);

router
  .route("/user/:id_user/:byUserId")
  //.route("/user/:id_user")
  //GET all image/post by user
  .get(imagesController.getImagesBy);

router
  .route("/:id/like")
  //UPDATE the LIKES property of an image
  .post(imagesController.likeImage);

export default router;
