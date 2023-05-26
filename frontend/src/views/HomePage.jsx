import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Card, Navbar } from "../components";
import { AuthContext } from "../utils";
import { API_URL } from "../../config";

import logo from "../assets/logo.png";

const RenderCards = ({ data, message }) => {
  if (data?.length > 0) {
    return data.map((image) => <Card key={image._id} {...image} />);
  }
  console.log("Manda mensaje");
  return (
    <h2 className="mt-5 font-bold text-white text-xl uppercase">{message}</h2>
  );
};

const HomePage = () => {
  const authContext = useContext(AuthContext);

  //const [category, setCategory] = useState('');
  const [images, setImages] = useState(null);
  const [displayedImages, setDisplayedImages] = useState(12);

  /* const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    alert("Categoría cambiada");
  } */

  const getImages = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/image`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        /* body: JSON.stringify({
          category: category,
        }), */
      });

      const data = await response.json();
      /* s */
      setImages(data.data.reverse());
    } catch (err) {
      alert(err);
      /*} finally {
      setGeneratingImg(false);
    } */
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const showMoreImages = () => {
    setDisplayedImages((prevDisplayedImages) => prevDisplayedImages + 12);
  };

  const displayedImagesData = images?.slice(0, displayedImages);

  return (
    <div className="bg-dark-blue px-5 pb-12">
      {/* Hero section */}
      <div className="h-80 flex flex-col justify-center items-center text-center">
        <img src={logo} alt="logo" className="w-6/12 object-contain"></img>
        <h2 className="text-lg text-white mt-2">
          Create with Artificial Intelligence, Share with the world.
        </h2>
      </div>

      {/* Buttons section */}
      <div className="flex justify-center space-x-4">
        <button
          /* onClick={() => handleCategoryChange('new')} */ className="bg-gradient-to-r from-neon-pink to-neon-blue text-dark-blue font-semibold py-2 px-4 rounded-full mb-4  hover:bg-neon-blue"
        >
          New Images
        </button>
        <button
          /* onClick={() => handleCategoryChange('top')} */ className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue"
        >
          Most Popular
        </button>
        <button
          /* onClick={() => handleCategoryChange('new')} */ className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue"
        >
          People
        </button>
        <button
          /* onClick={() => handleCategoryChange('new')} */ className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue"
        >
          Animals
        </button>
        <button
          /* onClick={() => handleCategoryChange('new')} */ className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue"
        >
          Landscape
        </button>
        <button
          /* onClick={() => handleCategoryChange('new')} */ className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue"
        >
          Abstract
        </button>
      </div>
      {/* Gallery section */}
      <div className="grid grid-cols-4 xs:grid-cols-1 md:grid-cols-4 gap-4 mx-4 my-4 md:mx-12">
        <RenderCards
          data={displayedImagesData}
          message="No existen imágenes. Sé el primero!"
        />
      </div>

      {displayedImages < images?.length && (
        <div className="flex justify-center">
          <button
            className="bg-medium-grey text-light-grey px-5 py-2 rounded-full mt-8 md:mr-8 hover:bg-neon-blue hover:text-dark-blue"
            onClick={showMoreImages}
          >
            Show more images
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
