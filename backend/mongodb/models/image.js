import mongoose from "mongoose";

const Image = new mongoose.Schema({
  prompt: { type: String, required: true },
  date: { type: Date, default: Date.now },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [
    {
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      url: { type: String, required: true },
    },
  ],
  categories: [{ name: { type: String, required: true } }],
});

const ImageSchema = mongoose.model("Image", Image);

export default ImageSchema;
