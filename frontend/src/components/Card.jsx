import React from "react";

import { downloadIcon } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, user_id, prompt, url }) => (
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

export default Card;
