// pages/blog/[slug].js
import dbConnect from "../../lib/dbConnect";
import Post from "../../models/Post";

export default function PostPage({ post }) {
  if (!post) return <div>Not found</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      <div style={{ color: "#666", marginBottom: 12 }}>{new Date(post.publishDate).toLocaleDateString()}</div>

      {post.images && post.images.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <img src={post.images[0]} alt="" style={{ maxWidth: "100%", borderRadius: 6 }} />
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} style={{ lineHeight: 1.7 }} />
      <div style={{ marginTop: 24, color: "#777" }}>Tags: {post.tags.join(", ")}</div>
    </article>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug }).lean();
  if (!post) return { props: { post: null } };

  // Convert mongoose date objects to strings
  post._id = post._id.toString();
  post.publishDate = post.publishDate ? post.publishDate.toISOString() : null;

  return { props: { post } };
}
