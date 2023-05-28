import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { downloadIcon } from "../assets";
import { downloadImage } from "../utils";
import { API_URL } from "../../config";

const Card = ({ _id, user_id, prompt, url, likes }) => {
  const [localLikes, setLocalLikes] = useState(likes);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // New state to track if the user has liked the image

  useEffect(() => {
    // Check if the user has liked the image
    const userHasLiked = user_id.likes && user_id.likes.includes(_id);
    setIsLiked(userHasLiked);
  }, [user_id.likes, _id]);

  const handleLike = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/v1/image/${_id}/like`, {
        method: "POST", // Change the HTTP method to POST
      });

      if (response.ok) {
        const { data } = await response.json();
        setLocalLikes(data.likes);
        setIsLiked(true); // Update the isLiked state to true
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error.message);
      // Handle error state or display an error message to the user
    } finally {
      setIsLoading(false);
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

          {/* Like button */}
          <button
            className={`bg-light-grey font-semibold hover:bg-neon-pink py-2 px-4 rounded-full mx-2 ${
              isLiked ? "text-neon-pink" : ""
            }`}
            onClick={handleLike}
            disabled={isLoading}
          >
            {isLoading ? "Liking..." : isLiked ? "Liked" : "Like"}
            <HandThumbUpIcon className="h-5 w-5 text-dark-blue inline-flex" />
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
