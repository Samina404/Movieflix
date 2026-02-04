import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

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
        </ThemeProvider>
      </body>
    </html>
  );
}
