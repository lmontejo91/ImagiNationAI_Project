import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'; //Se está utilizando la versión 2 de la API, por lo que se indica con el alias v2.

import Image from '../mongodb/models/image.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.route('/')
  //FUNCTION TO GET ALL IMAGES/POSTS
  .get(async (req, res) => {
    try {
      const images = await Image.find({});
      res.status(200).json({ success: true, data: images });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  })

  //FUNCTION TO CREATE A NEW IMAGE/POST
  .post(async (req, res) => {
    try {
      const { prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);

      const newImage = await Image.create({
        prompt,
        photo: photoUrl.url,
        //user,
      });
      res.status(200).json({ success: true, data: newImage });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
  });

export default router;