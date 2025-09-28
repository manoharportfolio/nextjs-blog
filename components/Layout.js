// components/Layout.js
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/"><h1>Satoru Blog — Demo</h1></Link>
          <nav>
            <Link href="/" style={{ marginRight: 16 }}>Home</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
        {children}
      </main>

      <footer>
        <small style={{ color: "#666" }}>
          Built for Satoru Foundation assignment • {new Date().getFullYear()}
        </small>
      </footer>
    </div>
  );
}
