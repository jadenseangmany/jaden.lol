// src/app/layout.tsx
import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Navigation Bar */}
        <Navbar />
        {/* Main Content */}
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
