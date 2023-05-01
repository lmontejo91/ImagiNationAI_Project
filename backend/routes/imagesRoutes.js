import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'; //Se está utilizando la versión 2 de la API, por lo que se indica con el alias v2.

import Image from '../mongodb/models/image.js';
import * as imagesController from '../controllers/imagesController.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/')
  //GET all image/post
  .get(imagesController.getImages)

  //POST a new image/post
  .post(imagesController.createNewPost);

router.route('/:id')
  //GET a specific image/post
  .get(imagesController.getImage)

  //DELETE a specific image/post
  .delete(imagesController.deletePost);

export default router;