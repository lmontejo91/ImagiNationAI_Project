import express from 'express';
import Image from '../mongodb/models/image.js';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'; //Se está utilizando la versión 2 de la API, por lo que se indica con el alias v2.

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

//Function to GET all image/post
const getImages = async (req, res) => {
    try {
      const images = await Image.find({}).populate('user_id');
      res.status(200).json({ success: true, data: images });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fallo al cargar las imágenes.' });
    }
}

//Function to POST a new image/post
const createNewPost = async (req, res) => {
    try {
        const { prompt, photo, user_id } = req.body;
        /* console.log(prompt);
        console.log(user_id);
        console.log(process.env.CLOUDINARY_CLOUD_NAME);
        console.log(process.env.CLOUDINARY_API_KEY); */
        //console.log(photo);
        const photoUrl = (await cloudinary.uploader.upload("../../frontend/src/assets/image8.jpg", {'folder': 'ImagiNationAI'}));
        //const photoUrl = (await cloudinary.uploader.upload("../../frontend/src/assets/image1.png")).secure_url;
        console.log("LLEGA AQUÍ");
        const newImage = await Image.create({
            prompt,
            url: photoUrl.secure_url,
            user_id
        });
        //res.status(200).json({ success: true, data: "Éxito" });
        res.status(200).json({ success: true, data: newImage });
    } catch (err) {
        console.log("Lanza Error");
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