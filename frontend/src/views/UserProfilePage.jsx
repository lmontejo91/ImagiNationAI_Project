import React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiPlusCircle } from "react-icons/hi";
import user from "../assets/user.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";

const UserProfilePage = () => {
  return (
    <div className="flex flex-col items-center bg-dark-blue px-5 py-8">
      <div className="mt-8">
        <img
          className="rounded-full w-32 h-32 object-cover "
          src={user}
          alt="Profile"
        />
      </div>
      <div className="mt-4 text-center">
        <h1 className="text-3xl text-white font-semibold">User Name</h1>
        <p className="text-lg text-white">username@email.com</p>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button className="bg-white font-semibold text-dark-blue py-2 px-4 rounded-full">
          <HiOutlinePhotograph className="h-5 w-5 mr-1 text-dark-blue inline-flex" />{" "}
          My Images
        </button>
        <button className="bg-medium-grey hover:bg-neon-pink  text-light-grey  py-2 px-4 rounded-full">
          <HiOutlineHeart className="h-5 w-5 mr-1 text-light-grey inline-flex" />{" "}
          My Likes
        </button>
        <button className="bg-medium-grey hover:bg-neon-pink  text-light-grey py-2 px-4 rounded-full">
          <HiPlusCircle className="h-5 w-5 mr-1 text-light-grey inline-flex" />{" "}
          Create New Image
        </button>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-4 gap-4 my-10 mx-10 md:mx-12">
        <img
          className="w-full h-full object-cover rounded-md"
          src={image8}
          alt="Photo 1"
        />
        <img
          className="w-full h-full object-cover rounded-md"
          src={image5}
          alt="Photo 2"
        />
        <img
          className="w-full h-full object-cover rounded-md"
          src={image6}
          alt="Photo 3"
        />
        <img
          className="w-full h-full object-cover rounded-md"
          src={image4}
          alt="Photo 4"
        />
        <img
          className="w-full h-full object-cover rounded-md"
          src={image2}
          alt="Photo 5"
        />
        <img
          className="w-full h-full object-cover rounded-md"
          src={image1}
          alt="Photo 6"
        />
        <img
          className="w-full h-full object-cover rounded-md"
          src={image3}
          alt="Photo 7"
        />
        <img
          className="w-full h-full object-cover rounded-md"
          src={image7}
          alt="Photo 8"
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
