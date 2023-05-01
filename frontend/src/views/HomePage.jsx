import React from "react";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import bgImage from "../assets/hero-bg.png";
import logo from "../assets/logo.png";
const HomePage = () => {
  return (
    <div className="bg-dark-blue px-5 pb-12">
      {/* Hero section */}
      <div className="h-80 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold text-white mb-4">ImagiNation AI</h1>
        <h2 className="text-lg text-white mb-8">
          Create with AI, share with the world.
        </h2>
        <button className="bg-neon-blue text-dark-blue px-8 py-2 rounded-md font-medium hover:bg-gray-200">
          Get started
        </button>
      </div>

      {/* Buttons section */}
      <div className="flex justify-center items-center my-12">
        <button className="bg-white text-gray-700 px-6 py-2 rounded-full mr-8 hover:bg-gray-300">
          Popular
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mr-8 hover:bg-gray-300">
          New
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mr-8 hover:bg-gray-300">
          Dreamlike
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mr-8 hover:bg-gray-300">
          Watercolor
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mr-8 hover:bg-gray-300">
          Cyber Punk
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mr-8 hover:bg-gray-300">
          Ultra Realistic
        </button>
      </div>

      {/* Gallery section */}
      <div className="grid grid-cols-4 gap-4 mx-12">
        <img
          src={image2}
          alt="Image Placeholder"
          className="h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image4}
          alt="Image Placeholder"
          className="h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image3}
          alt="Image Placeholder"
          className="h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image7}
          alt="Image Placeholder"
          className="h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image8}
          alt="Image Placeholder"
          className="h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image6}
          alt="Image Placeholder"
          className="h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image5}
          alt="Image Placeholder"
          className="h-64 w-full object-cover rounded-md"
        ></img>
        <img
          src={image4}
          alt="Image Placeholder"
          className="h-64 w-full object-cover rounded-md"
        ></img>
      </div>
    </div>
  );
};

export default HomePage;
