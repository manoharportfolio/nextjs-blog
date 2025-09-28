
// pages/api/blogs/[slug].js
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  const {
    query: { slug },
    method
  } = req;

  await dbConnect();

  if (method === "GET") {
    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, post });
  }

  if (method === "PUT") {
    try {
      const updated = await Post.findOneAndUpdate({ slug }, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "Not found" });
      return res.status(200).json({ success: true, post: updated });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (method === "DELETE") {
    try {
      const deleted = await Post.findOneAndDelete({ slug });
      if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
      return res.status(200).json({ success: true, message: "Deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}
