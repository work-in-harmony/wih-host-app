import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-wih-700 bg-wih-900/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="text-2xl font-bold text-wih-50">
          WorkInHarmony
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/#features" className="text-wih-50/80 hover:text-wih-50 transition">
            Features
          </Link>
          <Link to="/#pricing" className="text-wih-50/80 hover:text-wih-50 transition">
            Pricing
          </Link>
          <Link to="/#about" className="text-wih-50/80 hover:text-wih-50 transition">
            About
          </Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button className="px-6 py-2 text-wih-50 hover:text-wih-50/80 transition">Log in</button>
          <button className="rounded-full bg-wih-50 px-6 py-2 font-semibold text-wih-900 hover:bg-wih-50/90 transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-wih-700 bg-wih-800 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/#features" className="text-wih-50/80 hover:text-wih-50">
              Features
            </Link>
            <Link to="/#pricing" className="text-wih-50/80 hover:text-wih-50">
              Pricing
            </Link>
            <Link to="/#about" className="text-wih-50/80 hover:text-wih-50">
              About
            </Link>
            <button className="rounded-full bg-wih-50 px-6 py-2 font-semibold text-wih-900 hover:bg-wih-50/90 transition">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
