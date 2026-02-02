import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body className="bg-gray-900 text-white">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
