import { useState } from "react";
import preview from "../assets/preview.png";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "@heroicons/react/24/solid";

const GeneratorPage = () => {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("small"); // default size is 'small'

  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission here
  }
  return (
    <div className="flex">
      {/* Side Menu */}
      <div className="h-screen w-1/4 bg-dark-blue px-8 pt-10">
        <h2 className="text-2xl text-white font-bold mb-4">
          What do you want to create today?
        </h2>
        <p className="mb-4 text-light-grey font-extralight">
          Enter a prompt and select a category to generate an image.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-white" htmlFor="prompt">
            Prompt:
            <textarea
              className="border-gray-400 border-2 mt-2 p-2 w-full rounded h-24"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <a href="">
              Lacking inspiration?{" "}
              <span className="text-neon-blue">Try a surprise prompt.</span>
            </a>
          </label>
          <label className="block mb-4 text-dark-blue" htmlFor="category">
            Category:
            <select
              className="border-gray-400 border-2 p-2 w-full rounded"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="animals">Animals</option>
              <option value="nature">Nature</option>
              <option value="food">Food</option>
            </select>
          </label>

          <div className="flex items-center mb-4">
            <span className="mr-2 text-white">Size:</span>
            <label htmlFor="small" className="mr-2">
              <input
                type="radio"
                id="small"
                name="size"
                value="small"
                checked={size === "small"}
                onChange={(e) => setSize(e.target.value)}
              />
              <span className="ml-1 text-white">Portrait</span>
            </label>
            <label htmlFor="large">
              <input
                type="radio"
                id="large"
                name="size"
                value="large"
                checked={size === "large"}
                onChange={(e) => setSize(e.target.value)}
              />
              <span className="ml-1 text-white">Landscape</span>
            </label>
          </div>
          <div className="flex">
            <button className="bg-gradient-to-r from-neon-blue via-neon-pink to-neon-pink w-full hover:bg-white text-dark-blue font-semibold mt-12 py-2 rounded ">
              Generate image
            </button>
          </div>
        </form>
      </div>

      {/* Image Display */}
      <div className="bg-medium-grey flex h-screen w-3/4 p-4 text-center flex-col justify-center">
        {/* Show the generated image here */}
        <div className="mb-4 mx-auto">
          <img src={preview} alt="Generated Image" className="w-full" />
        </div>
        {/* Download and Share buttons */}
        <div className="mt-2 flex justify-center space-x-4">
          <button className="bg-light-grey font-semibold hover:bg-neon-pink py-2 px-4 rounded-full mr-4">
            <ArrowDownTrayIcon className="h-5 w-5 text-dark-blue   inline-flex" />{" "}
            Download
          </button>

          <button className="bg-light-grey font-semibold hover:bg-neon-pink py-2 px-4 rounded-full">
            <ShareIcon className="h-5 w-5 text-dark-blue  inline-flex" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;

