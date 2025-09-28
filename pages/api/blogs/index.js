import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
import slugify from "slugify";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "6", 10);
    const search = req.query.search || "";
    const tag = req.query.tag || "";

    const query = { published: true };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    if (tag) query.tags = tag;

    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(query);
    const posts = await Post.find(query).sort({ publishDate: -1 }).skip(skip).limit(limit).lean();

    return res.status(200).json({ success: true, page, limit, total, totalPages: Math.ceil(total / limit), posts });
  }

  if (method === "POST") {
    try {
      const { title, description, content, tags = [], images = [], publishDate, published } = req.body;
      if (!title || !description || !content) return res.status(400).json({ success: false, message: "title, description, content required" });

      let slug = slugify(title, { lower: true, strict: true });
      let counter = 1;
      while (await Post.findOne({ slug })) slug = `${slugify(title, { lower: true, strict: true })}-${counter++}`;

      const post = await Post.create({ title, slug, description, content, tags, images, publishDate: publishDate ? new Date(publishDate) : new Date(), published: published !== undefined ? !!published : true });
      return res.status(201).json({ success: true, post });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}
