import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

export default function Home({ initialData }) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(initialData.page || 1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = async () => {
      const res = await axios.get(`/api/blogs?search=${encodeURIComponent(search)}&page=1&limit=6`);
      setData(res.data);
      setPage(1);
    };
    const id = setTimeout(q, 400);
    return () => clearTimeout(id);
  }, [search]);

  async function goPage(p) {
    const res = await axios.get(`/api/blogs?page=${p}&limit=6&search=${encodeURIComponent(search)}`);
    setData(res.data);
    setPage(p);
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." style={{ padding: 8, width: "100%", borderRadius: 6, border: "1px solid #ddd" }} />
      </div>

      {data.posts.length === 0 ? <p>No posts.</p> : data.posts.map(p => <PostCard key={p._id} post={p} />)}

      <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}>
        <button disabled={page <= 1} onClick={() => goPage(page - 1)}>Prev</button>
        <span>Page {data.page} / {data.totalPages}</span>
        <button disabled={page >= data.totalPages} onClick={() => goPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const limit = 6;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/blogs?page=${page}&limit=${limit}`);
  const initialData = await res.json().catch(() => ({ posts: [], page: 1, totalPages: 1 }));
  return { props: { initialData } };
}
