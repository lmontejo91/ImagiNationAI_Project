import React, { useState, useContext, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { FcLike } from "react-icons/fc";
import { downloadIcon } from "../assets";
import { AuthContext, downloadImage } from "../utils";
import { ModalAlert, ModalImageDetail } from "./modals";
import { API_URL } from "../../config";

const Card = ({ _id, user, prompt, url, likes, likedBy }) => {
  const [localLikes, setLocalLikes] = useState(likes);
  const [isLikedBy, setIsLikedBy] = useState(likedBy);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [imageToOpen, setImageToOpen] = useState({
    _id: _id,
    user: user,
    prompt: prompt,
    url: url, 
    likes: likes,
  });  

  const handleLike = async () => {
    if (!authContext.isAuthenticated()) {
      openModalAlert();
      return; //Si el usuario no está logeado no se puede dar like y no se hace la petición al back.
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/v1/image/${_id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: authContext.user._id }), // Update the request payload with the correct key-value pair
      });

      if (response.ok) {
        const { likesCount, likedBy } = await response.json();
        setIsLikedBy(likedBy);
        setLocalLikes(likesCount);
        //console.log(likedBy);  
        //handleIconLike();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error); // Throw a specific error message received from the backend
      }
    } catch (error) {
      console.error(error.message);
      window.alert(error.message); // Show the error message in a window alert
    } finally {
      setIsLoading(false);
    }
  };

 /*  useEffect(() => {
    handleIconLike();
  }, [isLikedBy]); // Trigger API request whenever isLikedBy changes

  const handleIconLike = () => {
    return (
      authContext.isAuthenticated() && likedBy.includes(authContext?.user?._id)
    );
  }; */

  /* Modal Alert */
  const openModalAlert = () => {
    setIsModalAlertOpen(true);
  };

  const closeModalAlert = () => {
    setIsModalAlertOpen(false);
  };

  /* Modal Image Detail */
  const openModalImage = () => {
    setIsModalImageOpen(true);
  };

  const closeModalImage = () => {
    setIsModalImageOpen(false);
  };

  return (
    <div className="rounded-xl group relative hover:shadow-cardhover card">
      <img
        onClick={openModalImage}
        className="w-full h-128 object-cover rounded-xl"
        src={url}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-neon-pink flex justify-center items-center text-white text-xs font-bold">
              {user.username[0]}
            </div>
            <p className="text-white text-sm">{user.username}</p>
          </div>

          {isLikedBy.includes(authContext?.user?._id)  ? (
            <>
              <p className="text-white font-semibold mr-4">
                <FcLike
                  onClick={handleLike}
                  className="h-5 w-5 text-white inline-flex"
                />{" "}
                {localLikes}{" "}
              </p>
            </>
          ) : (
            <>
              <p className="text-white font-semibold mr-4">
                <HeartIcon
                  onClick={handleLike}
                  className="h-5 w-5 text-white inline-flex"
                />{" "}
                {localLikes}{" "}
              </p>
            </>
          )}

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

      <ModalAlert
        isOpen={isModalAlertOpen}
        onClose={closeModalAlert}
        title="Action denied!"
        message="You need to be logged in to like a post."
        type="info"
      />

      <ModalImageDetail
        isOpen={isModalImageOpen}
        onClose={closeModalImage}
        image={imageToOpen}
      />
    </div>
  );
};

export default Card;
