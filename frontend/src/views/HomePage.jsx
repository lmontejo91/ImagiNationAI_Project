import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';

import {Card} from '../components';
import { AuthContext } from '../utils';

import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import logo from "../assets/logo.png";

const HomePage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Si el contexto de autenticación no está disponible, AuthProvider no está envolviendo a MyComponent en el árbol de componentes
    alert("Error: AuthProvider no está envolviendo a MyComponent");
  }
  const RenderCards = ({data, message}) => {
    console.log("Entra Render Cards");
    if (data?.length > 0) {
      console.log("No debería entrar");
      return (
        data.map((image) => <Card key={image._id} {...image} />)
      );
    }
    console.log("Manda mensaje");
    return (
      <h2 className="mt-5 font-bold text-white text-xl uppercase">{message}</h2>
    );
  }

  return (
    <div className="bg-dark-blue px-5 pb-12">
      {/* Hero section */}
      <div className="h-80 flex flex-col justify-center items-center text-center">
        <img src={logo} alt="logo" className="w-6/12 object-contain"></img>
        <h2 className="text-lg text-white mt-2">
          Create with Artificial Intelligence, Share with the world.
        </h2>
        <Link to={`/generator-page/${authContext?.user?._id || '/'}`} className="bg-neon-blue text-dark-blue px-8 py-2 rounded-md font-medium hover:bg-gray-200">
          Get started
        </Link>
      </div>

      {/* Buttons section */}
      <div className="flex justify-center space-x-4">
        <button className="bg-gradient-to-r from-neon-pink to-neon-blue text-dark-blue font-semibold py-2 px-4 rounded-full mb-4  hover:bg-neon-blue">
          New Images
        </button>
        <button className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Top 10
        </button>
        <button className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Dreamlike
        </button>
        <button className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Watercolor
        </button>
        <button className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Cyber Punk
        </button>
        <button className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Ultra Realistic
        </button>
      </div>

      {/* Gallery section */}

      <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-4 gap-4 mx-4 my-4 md:mx-12">
        <RenderCards
          data={[]}
          message="No existen imágenes. Sé el primero!"
        />
        {/* <img
          src={image2}
          alt="Image Placeholder"
          className="h-40 md:h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image4}
          alt="Image Placeholder"
          className="h-40 md:h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image3}
          alt="Image Placeholder"
          className="h-40 md:h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image7}
          alt="Image Placeholder"
          className="h-40 md:h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image8}
          alt="Image Placeholder"
          className="h-40 md:h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image6}
          alt="Image Placeholder"
          className="h-40 md:h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image5}
          alt="Image Placeholder"
          className="h-40 md:h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image4}
          alt="Image Placeholder"
          className="h-40 md:h-64 w-full object-cover rounded-md"
        ></img>*/}
      </div>
    </div>
  );
};

export default HomePage;
