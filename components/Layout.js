// components/Layout.js
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <Link href="/"><a style={{ textDecoration: "none", color: "#111" }}><h1 style={{ margin: 0 }}>Satoru Blog — Demo</h1></a></Link>
        <nav>
          <Link href="/"><a style={{ marginRight: 16 }}>Home</a></Link>
          <Link href="/admin"><a>Admin</a></Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer style={{ marginTop: 60, borderTop: "1px solid #eee", paddingTop: 16, color: "#666" }}>
        <small>Built for Satoru Foundation assignment • {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}
