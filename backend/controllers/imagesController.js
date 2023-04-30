import express from 'express';
import Image from '../mongodb/models/image.js';


//Function to GET all image/post
const getImages = async (req, res) => {
    try {
      const images = await Image.find({});
      res.status(200).json({ success: true, data: images });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fallo al cargar las imágenes.' });
    }
}

//Function to POST a new image/post
const createNewPost = async (req, res) => {
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
        res.status(500).json({ success: false, message: 'No fue posible crear un nuevo post. Inténtalo de nuevo.' });
    }
}

//Function to GET a specific image/post
const getImage = async (req, res) => {
    try {
        const {id} = req.params;
        const image = await Image.findById(id);
        res.status(200).json({ success: true, data: image });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fallo al recuperar la imagen' });
    }
}

//Function to DELETE a specific image/post
const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const image = await Image.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: image });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Fallo al borrar.' });
    }
}

export {getImages, getImage, createNewPost, deletePost};