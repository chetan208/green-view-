import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import GlobalLayout from "@/components/layout/GlobalLayout";

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
      className={`${inter.variable} ${poppins.variable} h-full antialiased overflow-x-hidden scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f9fafb] text-zinc-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
        <GlobalLayout>
          {children}
        </GlobalLayout>
      </body>
    </html>
  );
}
