// pages/admin/index.js
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "../../components/Editor";

const blank = {
  title: "",
  description: "",
  content: "<p>Write your story...</p>",
  tags: "",
  images: ""
};

export default function Admin() {
  const [postForm, setPostForm] = useState(blank);
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    setLoading(true);
    const res = await axios.get("/api/blogs?limit=100&page=1");
    setPosts(res.data.posts || []);
    setLoading(false);
  }

  function setField(field, value) {
    setPostForm(prev => ({ ...prev, [field]: value }));
  }

  async function submit() {
    const body = {
      title: postForm.title,
      description: postForm.description,
      content: postForm.content,
      tags: postForm.tags ? postForm.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      images: postForm.images ? postForm.images.split(",").map(i => i.trim()).filter(Boolean) : []
    };

    try {
      if (editing) {
        await axios.put(`/api/blogs/${editing.slug}`, body);
        setEditing(null);
      } else {
        await axios.post("/api/blogs", body);
      }
      setPostForm(blank);
      loadPosts();
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  }

  function editPost(p) {
    setEditing(p);
    setPostForm({
      title: p.title,
      description: p.description,
      content: p.content,
      tags: (p.tags || []).join(", "),
      images: (p.images || []).join(", ")
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function delPost(p) {
    if (!confirm("Delete this post?")) return;
    await axios.delete(`/api/blogs/${p.slug}`);
    loadPosts();
  }

  return (
    <div>
      <h2>{editing ? `Editing: ${editing.title}` : "Create a new post"}</h2>

      <div style={{ marginBottom: 12 }}>
        <input placeholder="Title" value={postForm.title} onChange={e => setField("title", e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <input placeholder="Short description" value={postForm.description} onChange={e => setField("description", e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <label style={{ display: "block", marginBottom: 6 }}>Content</label>
        <Editor value={postForm.content} onChange={(val) => setField("content", val)} />
        <input placeholder="tags comma separated" value={postForm.tags} onChange={e => setField("tags", e.target.value)} style={{ width: "100%", padding: 8, marginTop: 8 }} />
        <input placeholder="images (comma separated urls)" value={postForm.images} onChange={e => setField("images", e.target.value)} style={{ width: "100%", padding: 8, marginTop: 8 }} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={submit}>{editing ? "Update" : "Create"}</button>
        {editing && <button style={{ marginLeft: 8 }} onClick={() => { setEditing(null); setPostForm(blank); }}>Cancel</button>}
      </div>

      <hr />

      <h3>All posts</h3>
      {loading ? <div>Loading...</div> : (
        <div>
          {posts.length === 0 && <div>No posts yet.</div>}
          {posts.map(p => (
            <div key={p._id} style={{ border: "1px solid #eee", padding: 8, marginBottom: 8 }}>
              <strong>{p.title}</strong> <span style={{ color: "#666" }}>({new Date(p.publishDate).toLocaleDateString()})</span>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => editPost(p)}>Edit</button>
                <button style={{ marginLeft: 8 }} onClick={() => delPost(p)}>Delete</button>
                <a style={{ marginLeft: 8 }} href={`/blog/${p.slug}`} target="_blank" rel="noreferrer">View</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
