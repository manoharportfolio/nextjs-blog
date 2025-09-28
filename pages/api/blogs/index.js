// pages/api/blogs/index.js
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
import slugify from "slugify";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    // Pagination + search + tag filter
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "6", 10);
    const search = req.query.search || "";
    const tag = req.query.tag || "";

    const query = { published: true };
    if (search) {
      // simple text-like search on title or description (case-insensitive)
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    if (tag) {
      query.tags = tag;
    }

    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      posts
    });

  } else if (method === "POST") {
    // Create a post (admin). For a real app add auth.
    try {
      const { title, description, content, tags = [], images = [], publishDate, published } = req.body;
      if (!title || !description || !content) {
        return res.status(400).json({ success: false, message: "title, description, content required" });
      }
      // build slug
      const slugBase = slugify(title, { lower: true, strict: true });
      let slug = slugBase;
      // ensure unique slug (quick approach)
      let counter = 1;
      while (await Post.findOne({ slug })) {
        slug = `${slugBase}-${counter++}`;
      }

      const doc = await Post.create({
        title,
        slug,
        description,
        content,
        tags,
        images,
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        published: published !== undefined ? !!published : true
      });

      res.status(201).json({ success: true, post: doc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
