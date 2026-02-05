import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MovieFlix - Discover Your Next Favorite Movie",
    template: "%s | MovieFlix",
  },
  description: "Explore the latest movies, trending films, and timeless classics on MovieFlix. Your ultimate destination for movie discovery and tracking.",
  keywords: ["movies", "film", "cinema", "streaming", "reviews", "watch later", "tmdb"],
  authors: [{ name: "MovieFlix Team" }],
  openGraph: {
    title: "MovieFlix - Discover Your Next Favorite Movie",
    description: "Explore the latest movies, trending films, and timeless classics. Your ultimate destination for movie discovery.",
    url: "https://movieflix-demo.vercel.app", 
    siteName: "MovieFlix",
    images: [
      {
        url: "/og-image.jpg", // Assuming an OG image exists or will exist
        width: 1200,
        height: 630,
        alt: "MovieFlix Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MovieFlix - Discover Your Next Favorite Movie",
    description: "Your ultimate destination for movie discovery and tracking.",
    creator: "@movieflix",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="py-8 text-center text-sm text-foreground/40 border-t border-card-border">
              © {new Date().getFullYear()} MOVIEFLIX. All rights reserved.
            </footer>
          </div>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
