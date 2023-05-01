import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/')
  .get(async (req, res) => res.status(200).send('Hello from DALL-E!'))

  .post(async (req, res) => {
    try {
      const {prompt} = req.body;

      const aiResponse = await openai.createImage({
        prompt,
        n:1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const image= aiResponse.data.data[0].b64_json; //Para obtener la imagen generada en sí, se utiliza la propiedad b64_json del objeto, que contiene los datos de la imagen codificados en base64 y en formato JSON.
      
      res.status(200).json({photo:image});
    } catch (error) {
      console.error(error);
      res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
    /*La interrogación seguida de un punto en error?.response.data.error.message es un operador 
    opcional de encadenamiento de propiedades, introducido en ECMAScript 2020.
    Este operador se utiliza para acceder a una propiedad de un objeto sin lanzar un error en caso
    de que el objeto sea nulo o indefinido. En el caso de error, si el objeto es nulo o indefinido,
    la expresión error?.response.data.error.message evalúa a undefined y no se lanzará ningún error. */
  });

export default router;