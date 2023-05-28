import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    date: { type: Date, default: Date.now },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    categories: [{ name: { type: String } }], //, required: true
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
