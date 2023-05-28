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
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { prompt: { $regex: search, $options: "i" } };
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
    const newImage = await Image.create({
      prompt,
      url: photoUrl.secure_url,
      user_id,
    });
    //res.status(200).json({ success: true, data: "Éxito" });
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
    const { userId } = req.body;

    // Check if the image exists
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Check if the user has already liked the image
    const hasLiked = image.likedBy.includes(userId);
    if (hasLiked) {
      return res
        .status(400)
        .json({ error: "User has already liked this image" });
    }

    // Update the image document with the new like
    image.likes += 1;
    image.likedBy.push(userId);
    await image.save();

    return res.json({
      message: "Image liked successfully",
      likesCount: image.likes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export { getImages, getImage, createNewPost, deletePost, likeImage };
