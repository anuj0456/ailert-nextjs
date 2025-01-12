import "./globals.css";

export const metadata = {
  title: "AiLert - The Open Source AI Newsletter",
  description: "Community-driven AI insights platform",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
