import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Footer from "./Footer";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // adjust if you need other weights
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lux Rental",
  description: "A real estate rental platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.variable} font-sans antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
