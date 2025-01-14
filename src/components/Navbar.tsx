import Link from 'next/link';

export default function Navbar() {
    return (
      <nav className="w-full bg-black bg-opacity-50 backdrop-blur-md text-white py-4 fixed top-0 z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold">
            |o|
          </Link>
           
  
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

            {/* Non "scroll down" links */}
            <Link href="/Courses" className="hover:underline">
              Courses
            </Link>
            <Link href="/Socials" className="hover:underline">
              Socials
            </Link>
          </div>
        </div>
      </nav>
    );
  }
  