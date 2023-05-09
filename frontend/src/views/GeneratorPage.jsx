import { useState } from "react";
import preview from "../assets/preview.png";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "@heroicons/react/24/solid";
import { getRandomPrompt } from '../utils';
import { API_URL } from '../../config';

const GeneratorPage = () => {
  /* const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("small"); */ // default size is 'small'
  const [form, setForm] = useState({
    prompt: '',
    size: '256x256', // default size is 'small'
    category: [],
    photo: '',
  });

  //const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    const name = e.target.name;
    console.log(name);
    if (name === "category") {
      /* const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      ); */
      setForm(prevForm => ({
        ...prevForm,
        category: [...prevForm.category, value]
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
    console.log(form);
  };


  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${API_URL}/v1/dalleApi`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form: form,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  }

  const handleSurprisePrompt = () => {
    console.log("Entra");
    const randomPrompt = getRandomPrompt(form.prompt);
    console.log(randomPrompt);
    setForm({ ...form, prompt: randomPrompt });
    console.log(form);
  };

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
              className="text-dark-blue border-gray-400 border-2 mt-2 p-2 w-full rounded h-24"
              id="prompt"
              name="prompt"
              value={form.prompt}
              onChange={handleChange}
            />
            <a href="" onClick={handleSurprisePrompt}>
              Lacking inspiration?{" "}
              <span className="text-neon-blue">Try a surprise prompt.</span>
            </a>
          </label>
          <label className="block mb-4 text-dark-blue" htmlFor="category">
            Category:
            <select
              className="border-gray-400 border-2 p-2 w-full rounded"
              id="category"
              name="category"
              multiple={true}
              value={form.category}
              onChange={handleChange}
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
                value="256x256"
                checked={form.size === "256x256"}
                onChange={handleChange}
              />
              <span className="ml-1 text-white">Small</span>
            </label>
            <label htmlFor="medium">
              <input
                type="radio"
                id="medium"
                name="size"
                value="512x512"
                checked={form.size === "512x512"}
                onChange={handleChange}
              />
              <span className="ml-1 text-white">Medium</span>
            </label>
            <label htmlFor="large">
              <input
                type="radio"
                id="large"
                name="size"
                value="1024x1024"
                checked={form.size === "1024x1024"}
                onChange={handleChange}
              />
              <span className="ml-1 text-white">Large</span>
            </label>
          </div>
          <div className="flex">
            <button onClick={generateImage} className="bg-gradient-to-r from-neon-blue via-neon-pink to-neon-pink w-full hover:bg-white text-dark-blue font-semibold mt-12 py-2 rounded ">
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

