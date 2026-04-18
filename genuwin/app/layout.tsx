import "./globals.css";

export const metadata = {
  title: "Genuwin Vibez",
  description: "Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui" }}>
        
        {/* GLOBAL HEADER */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px 25px",
            borderBottom: "1px solid #eee",
          }}
        >
          {/* LEFT SIDE (LOGO + BRAND) */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/logo.jpeg"
              alt="logo"
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />

            <strong style={{ fontSize: 18 }}>
              Genuwin Vibez
            </strong>
          </div>

          {/* RIGHT SIDE (optional future nav) */}
          <nav style={{ fontSize: 14, opacity: 0.7 }}>
            Blog
          </nav>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>
      </body>
    </html>
  );
}