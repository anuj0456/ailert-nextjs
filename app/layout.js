import "./globals.css";

import { Metadata } from "next";

export const metadata = {
  title: "AiLert - AI Newsletter",
  description: "The open-source AI newsletter",
  icons: {
    icon: [
      { url: "/logo.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/logo.svg", sizes: "64x64", type: "image/svg+xml" },
      { url: "/logo.svg", sizes: "128x128", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
