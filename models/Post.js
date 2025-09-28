// models/Post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // url-friendly
  description: { type: String, required: true },
  content: { type: String, required: true }, // HTML from editor
  tags: { type: [String], default: [] },
  images: { type: [String], default: [] }, // store image URLs
  publishDate: { type: Date, default: Date.now },
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
