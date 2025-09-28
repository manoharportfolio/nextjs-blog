// pages/blog/[slug].js
import dbConnect from "../../lib/dbConnect";
import Post from "../../models/Post";
import { format } from "date-fns";

export default function PostPage({ post }) {
  if (!post) return <div>Not found</div>;

  return (
    <article style={{ maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 12 }}>{post.title}</h1>
      <div style={{ color: "#666", marginBottom: 12 }}>
        {post.publishDate ? format(new Date(post.publishDate), "dd/MM/yyyy") : ""}
      </div>

      {post.images && post.images.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <img src={post.images[0]} alt={post.title} style={{ maxWidth: "100%", borderRadius: 6 }} />
        </div>
      )}

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{ lineHeight: 1.7, marginBottom: 24 }}
      />

      {post.tags && post.tags.length > 0 && (
        <div style={{ color: "#777" }}>Tags: {post.tags.join(", ")}</div>
      )}
    </article>
  );
}

// Fetch post data from MongoDB
export async function getServerSideProps({ params }) {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug }).lean();

  if (!post) return { props: { post: null } };

  // Convert Mongoose ObjectId and Dates to strings
  post._id = post._id.toString();
  post.publishDate = post.publishDate ? post.publishDate.toISOString() : null;

  return { props: { post } };
}
