// src/components/Navbar.tsx
export default function Navbar() {
    return (
      <nav className="w-full bg-black text-white py-4 fixed top-0 z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div className="text-lg font-bold">|o|</div>
  
          {/* Navigation Links */}
          <div className="space-x-6">
            <a href="#about" className="hover:underline">
              About Me
            </a>
            <a href="#experience" className="hover:underline">
              Experience
            </a>
            <a href="#projects" className="hover:underline">
              Projects
            </a>
          </div>
        </div>
      </nav>
    );
  }
  