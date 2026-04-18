import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

export default async function Home() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(_createdAt desc){
      title,
      slug,
      mainImage
    }
  `);

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: 30 }}>
  <h1 style={{ fontSize: 30, fontWeight: 800 }}>
    LATEST
  </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {posts.map((post: any) => (
          <Link
            key={post.slug.current}
            href={`/post/${post.slug.current}`}
            style={{
              display: "block",
              borderRadius: 16,
              overflow: "hidden",
              background: "#fff",
              color: "#000",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease",
            }}
            className="card-hover"
          >
            {/* IMAGE */}
            {post.mainImage && (
              <div
                style={{
                  width: "100%",
                  height: 200,
                  overflow: "hidden",
                }}
              >
                <img
                  src={urlFor(post.mainImage).width(800).url()}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* TEXT */}
            <div style={{ padding: 15 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>
                {post.title}
              </h2>

              <p style={{ fontSize: 14, opacity: 0.6 }}>
                Read article →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* SIMPLE HOVER CSS */}
      <style>{`
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }
      `}</style>
    </main>
  );
}