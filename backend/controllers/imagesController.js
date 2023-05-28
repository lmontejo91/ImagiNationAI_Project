import express from "express";
import Image from "../mongodb/models/image.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"; //Se está utilizando la versión 2 de la API, por lo que se indica con el alias v2.

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Function to GET all images/posts
const getImages = async (req, res) => {
  try {
    const { search, selectedCategory } = req.query;
    let query = {};

    if (search) {
      query.prompt = { $regex: search, $options: "i" };
    }

    if (selectedCategory) {
      query.categories = { $in: [selectedCategory] };
    }

    const images = await Image.find(query).populate("user_id");
    res.status(200).json({ success: true, data: images });

  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load images." });
  }
};

// Function to POST a new image/post
const createNewPost = async (req, res) => {
  try {
    const { prompt, photo, user_id } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: "ImagiNationAI",
    });
    //const photoUrl = (await cloudinary.uploader.upload("../../frontend/src/assets/image1.png")).secure_url;
    
    // Combinar categorías seleccionadas con "new" y "top"
    //const categories = ["new", "top", ...category];

    const newImage = await Image.create({
      prompt,
      url: photoUrl.secure_url,
      user_id,
      //categories: categories,
    });

    res.status(200).json({ success: true, data: newImage });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create a new post. Please try again.",
    });
  }
};

// Function to GET a specific image/post
const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.status(200).json({ success: true, data: image });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve the image." });
  }
};

// Function to GET all images/post from a specific user or from his likes
const getImagesBy = async (req, res) => {
  try {
    /* const { id_user } = req.params;

    const images = await Image.find({ user_id: id_user }).populate("user_id", "name").exec(); */
    const { id_user, byUserId } = req.params;
    let images = [];

    if(byUserId){
      images = await Image.find({ user_id: id_user }).populate("user_id").exec();
    }else{
      images = await Image.find({ "likes.user_id": id_user })
                                .populate("likes.user_id", "name") // Carga los datos del usuario en los likes
                                .exec();
    }
    
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve the images." });
  }
};

/* // Function to GET images/post which the user liked
const getMyLikedImages = async (req, res) => {
  try {
    const { id_user } = req.params;
    const images = await Image.find({ "likes.user_id": id_user })
                              .populate("likes.user_id", "name") // Carga los datos del usuario en los likes
                              .exec();
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve the images." });
  }
}; */


// Function to DELETE a specific image/post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: image });
  } catch (err) {
    res.status(404).json({ success: false, message: "Failed to delete." });
  }
};

// Function to Update the LIKES property of an image
const likeImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID and increment the likes property
    const image = await Image.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json({ success: true, data: image });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to like the image." });
  }
};

export { getImages, getImage, getImagesBy, createNewPost, deletePost, likeImage };
