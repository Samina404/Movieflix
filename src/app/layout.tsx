import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <div className="relative flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="py-8 text-center text-sm text-white/40 border-t border-white/5">
            © {new Date().getFullYear()} MOVIEFLIX. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
