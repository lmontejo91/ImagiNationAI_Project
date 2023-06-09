import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    date: { type: Date, default: Date.now },
    url: { type: String, required: true },
    //numero de likes que tiene la imagen
    likes: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // array de usuarios que han dado like
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    comments: [
      {
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    categories: {
      type: [String],
      enum: [
        "new",
        "top",
        "people",
        "animals",
        "landscape",
        "abstract",
        "others",
      ],
      default: ["new", "top"],
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
