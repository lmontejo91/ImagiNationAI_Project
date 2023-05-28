import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  date: { type: Date, default: Date.now },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  /* likes: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
  ], */
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [
    {
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      //url: { type: String, required: true },
    },
  ],
  categories: {
    type: [String],
    enum: ["new", "top", "people", "animals", "landscape", "abstract", "others"],
    default: ["new", "top"],
  },
}, { timestamps: true });

const Image = mongoose.model("Image", imageSchema);

export default Image;
