import React, { useState } from "react";
import axios from "axios";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { downloadIcon } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, user_id, prompt, url, likes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);

  const handleLike = async () => {
    if (!isLiked) {
      try {
        // Send a POST request to the backend to increment the likes
        await axios.post(`/images/${_id}/like`);

        // Update the likes locally
        setIsLiked(true);
      } catch (error) {
        console.log("Failed to like the image:", error);
      }
    }
  };

  return (
    <div className="rounded-xl group relative hover:shadow-cardhover card">
      <img
        className="w-full h-full object-cover rounded-xl"
        src={url}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-neon-pink flex justify-center items-center text-white text-xs font-bold">
              {user_id.name[0]}
            </div>
            <p className="text-white text-sm">{user_id.name}</p>
          </div>
          <button
            className="bg-light-grey font-semibold hover:bg-neon-pink py-2 px-4 rounded-full mx-2"
            onClick={handleLike}
            disabled={isLiked}
          >
            <HandThumbUpIcon className="h-5 w-5 text-dark-blue inline-flex" />
            Like
          </button>
          <p className="text-white font-semibold mr-4">
            <HeartIcon className="h-5 w-5 text-white inline-flex" />{" "}
            {localLikes}{" "}
          </p>
          <button
            type="button"
            onClick={() => downloadImage(_id, url)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={downloadIcon}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
