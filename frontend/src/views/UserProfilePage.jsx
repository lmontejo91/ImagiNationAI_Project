import React, { useContext, useState, useEffect } from "react";
import { HiOutlinePhotograph, HiOutlineHeart, HiPlusCircle, HiUserCircle } from "react-icons/hi";
import { AuthContext } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { Card } from "../components";
import user from "../assets/user.png";

const RenderCards = ({ data, message }) => {
  if (data?.length > 0) {
    return data.map((image) => <Card key={image._id} {...image} />);
  }
  console.log("Manda mensaje");
  return (
    <h2 className="mt-5 font-bold text-white text-lg uppercase">{message}</h2>
  );
};

const UserProfilePage = () => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [images, setImages] = useState(null);
  const [displayedImages, setDisplayedImages] = useState(12);
  const [byUserId, setByUserId] = useState(true);

  const getImages = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/image/user/${authContext.user._id}/${byUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setImages(data.data.reverse());

    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getImages();
  }, [byUserId]);

  const showMoreImages = () => {
    setDisplayedImages((prevDisplayedImages) => prevDisplayedImages + 12);
  };

  const handleContentOnButtonsClick = (isByUserId) => {
    setByUserId(isByUserId);
  };

  const displayedImagesData = images?.slice(0, displayedImages);

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
        <h1 className="text-3xl text-white font-semibold">
          {authContext?.user?.name || "User Name"}
        </h1>
        <p className="text-lg text-white">
          {authContext?.user?.email || "email@example.com"}
        </p>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
      <button className="bg-medium-grey hover:bg-neon-pink  text-light-grey  py-2 px-4 rounded-full">
          <HiUserCircle className="h-5 w-5 mr-1 text-light-grey inline-flex" />{" "}
          My Account
        </button>
        <button 
          onClick = {() => handleContentOnButtonsClick(true)}
          className="bg-white font-semibold text-dark-blue py-2 px-4 rounded-full">
          <HiOutlinePhotograph className="h-5 w-5 mr-1 text-dark-blue inline-flex" />{" "}
          My Images
        </button>
        <button 
          onClick = {() => handleContentOnButtonsClick(false)}
          className="bg-medium-grey hover:bg-neon-pink  text-light-grey  py-2 px-4 rounded-full">
          <HiOutlineHeart className="h-5 w-5 mr-1 text-light-grey inline-flex" />{" "}
          My Likes
        </button>
        <button
          onClick={() => navigate(`/generator-page/${authContext?.user?._id || ""}`)} 
          className="bg-medium-grey hover:bg-neon-pink  text-light-grey py-2 px-4 rounded-full">
            <HiPlusCircle className="h-5 w-5 mr-1 text-light-grey inline-flex" />{" "}
            Create New Image
        </button>
      </div>

      {/* Gallery section */}
      <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-4 gap-4 my-10 mx-10 md:mx-12">
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

export default UserProfilePage;
