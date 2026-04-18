import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body
    }`,
    { slug }
  );

  if (!post) {
    return (
      <main style={{ padding: 30 }}>
        <h1>Post not found</h1>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 750, margin: "0 auto", padding: 30 }}>
      <h1 style={{ fontSize: 36, fontWeight: "bold", marginBottom: 20 }}>
        {post.title}
      </h1>

      <PortableText
        value={post.body}
        components={{
          types: {
            image: ({ value }) => {
              // IMPORTANT SAFETY CHECK
              if (!value?.asset) return null;

              const imgUrl = urlFor(value).width(1200).url();

              return (
                <img
                  src={imgUrl}
                  alt={value?.alt || "image"}
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    margin: "20px 0",
                    display: "block",
                  }}
                />
              );
            },
          },

          block: {
            normal: ({ children }) => (
              <p style={{ marginBottom: 16 }}>{children}</p>
            ),
            h1: ({ children }) => (
              <h1 style={{ fontSize: 32 }}>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ fontSize: 26 }}>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ fontSize: 22 }}>{children}</h3>
            ),
          },
        }}
      />
    </main>
  );
}