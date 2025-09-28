import { useState, useEffect } from "react";
import Link from "next/link";

export default function PostCard({ post }) {
  const [dateStr, setDateStr] = useState(""); // placeholder initially

  useEffect(() => {
    // runs only on client
    setDateStr(new Date(post.publishDate).toLocaleDateString());
  }, [post.publishDate]);

  return (
    <article style={{ border: "1px solid #e6e6e6", padding: 16, borderRadius: 8, marginBottom: 12 }}>
      <h2 style={{ margin: "0 0 8px 0" }}>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p style={{ margin: "0 0 8px 0", color: "#333" }}>{post.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#777" }}>
        <span>{dateStr}</span>
        <span>{post.tags && post.tags.join(", ")}</span>
      </div>
    </article>
  );
}
