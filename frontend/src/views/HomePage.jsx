import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Card } from "../components";
import { AuthContext } from "../utils";
import { API_URL } from "../../config";

import logo from "../assets/logo.png";

const RenderCards = ({ data, message }) => {
  if (data?.length > 0) {
    return data.map((image) => <Card key={image._id} {...image} />);
  }
  console.log("Manda mensaje");
  return (
    <h2 className="mt-5 font-bold text-white text-lg uppercase">{message}</h2>
  );
};

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const [category, setCategory] = useState("new");
  const [activeCategory, setActiveCategory] = useState("new");

  const [images, setImages] = useState(null);
  const [displayedImages, setDisplayedImages] = useState(12);

  const [searchQuery, setSearchQuery] = useState("");

  const getImages = async () => {
    try {
      const response = await fetch(
        `${API_URL}/v1/image?search=${searchQuery}&selectedCategory=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      let sortedImages =
        category === "top"
          ? data.data.sort((a, b) => b.likes - a.likes)
          : data.data.reverse();

      setImages(sortedImages);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getImages();
  }, [searchQuery, category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setActiveCategory(newCategory);
  };

  const showMoreImages = () => {
    setDisplayedImages((prevDisplayedImages) => prevDisplayedImages + 12);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getImages();
  };

  const displayedImagesData = images?.slice(0, displayedImages);

  return (
    <div className="bg-dark-blue px-5 pb-8">
      <div className="h-80 flex flex-col justify-center items-center text-center">
        <img src={logo} alt="logo" className="w-6/12 object-contain"></img>
        <h2 className="text-lg text-white mt-2">
          Create with Artificial Intelligence, Share with the world.
        </h2>

        <div className="flex justify-center my-6">
          <form className=" " onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="px-4 py-2 rounded-full w-96 border-none focus:outline-none focus:ring-neon-blue"
            />
          </form>
        </div>
      </div>

      <div className="flex flex-wrap justify-center space-x-4">
        <button
          onClick={() => handleCategoryChange("new")}
          className={`${
            activeCategory === "new" ? "active-button" : "inactive-button"
          }`}
        >
          New Images
        </button>
        <button
          onClick={() => handleCategoryChange("top")}
          className={`${
            activeCategory === "top" ? "active-button" : "inactive-button"
          }`}
        >
          Most Popular
        </button>
        <button
          onClick={() => handleCategoryChange("people")}
          className={`${
            activeCategory === "people" ? "active-button" : "inactive-button"
          }`}
        >
          People
        </button>
        <button
          onClick={() => handleCategoryChange("animals")}
          className={`${
            activeCategory === "animals" ? "active-button" : "inactive-button"
          }`}
        >
          Animals
        </button>
        <button
          onClick={() => handleCategoryChange("landscape")}
          className={`${
            activeCategory === "landscape" ? "active-button" : "inactive-button"
          }`}
        >
          Landscape
        </button>
        <button
          onClick={() => handleCategoryChange("abstract")}
          className={`${
            activeCategory === "abstract" ? "active-button" : "inactive-button"
          }`}
        >
          Abstract
        </button>
        <button
          onClick={() => handleCategoryChange("others")}
          className={`${
            activeCategory === "others" ? "active-button" : "inactive-button"
          }`}
        >
          Others
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 my-4 md:mx-12">
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
