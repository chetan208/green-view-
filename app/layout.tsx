import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Green View Senior Secondary School",
  description: "A trusted private senior secondary school focused on academic excellence, discipline, values, and modern parent communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#fcfcfc] text-zinc-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
        <Header />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
