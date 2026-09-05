import type { Metadata } from "next";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Profile Settings | Green View School",
};

export default function ProfileSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-[#F0F4F8] pt-28 pb-12">
          {children}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
