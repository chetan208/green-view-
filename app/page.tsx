import { Navbar, Hero, FeatureScroll, AboutUs, NoticeBoard, CTA, Footer } from "@/components/Component1";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <FeatureScroll />
        <AboutUs />
        <NoticeBoard />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
