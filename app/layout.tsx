import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const gilroy = localFont({
  src: "../public/fonts/Gilroy-Light.otf",
  variable: "--font-gilroy-light",
});
const gilroyBold = localFont({
  src: "../public/fonts/Gilroy-ExtraBold.otf",
  variable: "--font-gilroy-bold",
});

export const metadata: Metadata = {
  title: "Read Journey",
  description: "Follow your reading progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${gilroy.variable} ${gilroyBold.variable} `}
    >
      <body className="min-h-full flex flex-col">
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
