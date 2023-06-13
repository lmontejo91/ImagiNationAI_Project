import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "@heroicons/react/24/solid";
import preview from "../assets/preview.png";
import placeholder from "../assets/image7.jpg";
import { AuthContext, getRandomPrompt } from "../utils";
import { API_URL } from "../../config";
import { Loader } from "../components";

const GeneratorPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  /* if (!authContext) {
    // Si el contexto de autenticación no está disponible, AuthProvider no está envolviendo a MyComponent en el árbol de componentes
    alert("Error: AuthProvider no está envolviendo a MyComponent");
  }else{
    console.log(authContext.user);
    console.log(authContext.user._id);
  } */

  const [form, setForm] = useState({
    prompt: "",
    size: "256x256", // default size is 'small'
    category: [],
    photo: "",
  });

  //const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleChange = (e) => {
    /* const value = e.target.value;
    const name = e.target.name;

    if (name === "category") {
      setForm((prevForm) => ({
        ...prevForm,
        category: [...prevForm.category, value],
      })); */
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        // Si el checkbox está marcado, agregamos el valor a la lista de categorías seleccionadas
        setForm((prevForm) => ({
          ...prevForm,
          category: [...prevForm.category, value],
        }));
      } else {
        // Si el checkbox está desmarcado, eliminamos el valor de la lista de categorías seleccionadas
        setForm((prevForm) => ({
          ...prevForm,
          category: prevForm.category.filter((category) => category !== value),
        }));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    console.log(form);
  };

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async (e) => {
    e.preventDefault();
    //console.log("Entra GENERATE_IMAGE");
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${API_URL}/v1/dalleApi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* console.log("Entra SUBMIT");
    console.log(authContext.user_id); */
    // Handle form submission here
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/v1/image`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, user_id: authContext.user._id }),
        });

        await response.json();
        if (response.ok) {
        } else {
          alert("Error al guardar la imagen");
        }
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  const handleSurprisePrompt = () => {
    console.log("Entra");
    const randomPrompt = getRandomPrompt(form.prompt);
    console.log(randomPrompt);
    setForm({ ...form, prompt: randomPrompt });
    console.log(form);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Side Menu */}
      <div className="h-screen lg:w-1/4 bg-dark-blue px-8 pt-10">
        <h2 className="text-2xl text-white font-bold mb-4">
          What do you want to create today?
        </h2>
        <p className="mb-4 text-light-grey font-extralight">
          Enter a prompt and select a category to generate an image.
        </p>
        <form>
          <label className="block mb-4 text-white" htmlFor="prompt">
            Prompt:
            <textarea
              className="text-dark-blue border-gray-400 border-2 mt-2 p-2 w-full rounded h-24"
              id="prompt"
              name="prompt"
              value={form.prompt}
              onChange={handleChange}
            />
            <p onClick={handleSurprisePrompt}>
              Lacking inspiration?{" "}
              <span className="text-neon-blue">Try a surprise prompt.</span>
            </p>
          </label>
          {/* <label className="block mb-4 text-white" htmlFor="category">
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
              <option value="people">People</option>
              <option value="animals">Animals</option>
              <option value="landscape">Landscape</option>
              <option value="abstract">Abstract</option>
              <option value="others">Others</option>
            </select>
          </label> */}
          <label className="block mb-4 text-white">
            Category:
            <div className="flex text-sm mt-2">
              <div className="mr-6">
                <input
                  type="checkbox"
                  id="people"
                  name="category"
                  value="people"
                  checked={form.category.includes("people")}
                  onChange={handleChange}
                />
                <label htmlFor="people">People</label>
              </div>
              <div className="mr-6">
                <input
                  type="checkbox"
                  id="animals"
                  name="category"
                  value="animals"
                  checked={form.category.includes("animals")}
                  onChange={handleChange}
                />
                <label htmlFor="animals">Animals</label>
              </div>
              <div className="mr-6">
                <input
                  type="checkbox"
                  id="abstract"
                  name="category"
                  value="abstract"
                  checked={form.category.includes("abstract")}
                  onChange={handleChange}
                />
                <label htmlFor="abstract">Abstract</label>
              </div>
            </div>
            <div className="flex text-sm mt-2">
              <div className="mr-6">
                <input
                  type="checkbox"
                  id="landscape"
                  name="category"
                  value="landscape"
                  checked={form.category.includes("landscape")}
                  onChange={handleChange}
                />
                <label htmlFor="landscape">Landscape</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="others"
                  name="category"
                  value="others"
                  checked={form.category.includes("others")}
                  onChange={handleChange}
                />
                <label htmlFor="others">Others</label>
              </div>
            </div>
          </label>

          <div className="flex items-center mb-3">
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
            <button
              onClick={generateImage}
              className="bg-gradient-to-r from-neon-blue via-neon-pink to-neon-pink w-full hover:bg-white text-dark-blue font-semibold mt-12 py-2 rounded "
            >
              {generatingImg ? "Generating..." : "Generate image"}
            </button>
          </div>
        </form>
      </div>

      {/* Image Display */}
      <div className="bg-medium-grey flex flex-col justify-center md:h-screen lg:w-3/4 p-4 text-center">
        {/* Show the generated image here */}
        {form.photo ? (
          <img src={form.photo} alt={form.prompt} className="lg:h-[32rem]" />
        ) : (
          <div className="mb-4 mx-auto">
            <img src={preview} alt="Preview Image" className="lg:h-[38rem]" />
          </div>
        )}

        {generatingImg && (
          <div className="absolute h-full inset-0 top-[68px] left-1/4 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
            <Loader />
          </div>
        )}

        {/* Download and Share buttons */}
        <div className="mt-2 flex justify-center space-x-4">
          <button className="bg-light-grey font-semibold hover:bg-neon-pink py-2 px-4 rounded-full mr-4">
            <ArrowDownTrayIcon className="h-5 w-5 text-dark-blue inline-flex" />{" "}
            Download
          </button>

          <button
            onClick={handleSubmit}
            className="bg-light-grey font-semibold hover:bg-neon-pink py-2 px-4 rounded-full"
          >
            <ShareIcon className="h-5 w-5 text-dark-blue inline-flex" />
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;
