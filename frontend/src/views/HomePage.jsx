import React from "react";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import logo from "../assets/logo.png";

const HomePage = () => {
  return (
    <div className="bg-dark-blue px-5 pb-12">
      {/* Hero section */}
      <div className="h-80 flex flex-col justify-center items-center text-center">
        <img src={logo} alt="logo" className="w-6/12 object-contain"></img>
        <h2 className="text-lg text-white mt-4">
          Create with AI, Share with the world.
        </h2>
      </div>

      {/* Buttons section */}
      <div className="flex flex-col md:flex-row justify-center items-center my-12">
        <button className="bg-white text-gray-700 px-6 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue">
          Popular
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          New
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Dreamlike
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Watercolor
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Cyber Punk
        </button>
        <button className="bg-btn-dark text-light-grey px-5 py-2 rounded-full mb-4 md:mr-8 hover:bg-neon-blue hover:text-dark-blue">
          Ultra Realistic
        </button>
      </div>

      {/* Gallery section */}
      <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-4 gap-4 mx-4 md:mx-12">
        <img
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
        ></img>
      </div>
    </div>
  );
};

export default HomePage;
