import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-black bg-opacity-50 backdrop-blur-md text-white py-4 fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          |o|
        </Link>


        {/* Navigation Links */}
        <div className="space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/experience" className="hover:underline">
            Experience
          </Link>
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>

          {/* Non "scroll down" links */}
          <Link href="/socials" className="hover:underline">
            Socials
          </Link>
        </div>
      </div>
    </nav>
  );
}
