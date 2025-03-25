
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-heading text-2xl font-bold text-blood-600 transition-all duration-200 hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-blood-500 flex items-center justify-center text-white font-bold animate-pulse-subtle">
            B+
          </div>
          <span>BloodCircle</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-base font-medium transition-all duration-200 hover:text-blood-500 ${
              location.pathname === "/" ? "text-blood-500" : "text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-base font-medium transition-all duration-200 hover:text-blood-500 ${
              location.pathname === "/about" ? "text-blood-500" : "text-foreground"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-base font-medium transition-all duration-200 hover:text-blood-500 ${
              location.pathname === "/contact" ? "text-blood-500" : "text-foreground"
            }`}
          >
            Contact
          </Link>

          <div className="ml-4 space-x-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-blood-500 hover:bg-blood-600 rounded-full">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[72px] inset-x-0 bg-white dark:bg-black p-6 md:hidden transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } shadow-lg`}
      >
        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className={`text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 ${
              location.pathname === "/"
                ? "bg-blood-50 text-blood-500 dark:bg-blood-950 dark:text-blood-400"
                : "hover:bg-muted"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 ${
              location.pathname === "/about"
                ? "bg-blood-50 text-blood-500 dark:bg-blood-950 dark:text-blood-400"
                : "hover:bg-muted"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 ${
              location.pathname === "/contact"
                ? "bg-blood-50 text-blood-500 dark:bg-blood-950 dark:text-blood-400"
                : "hover:bg-muted"
            }`}
          >
            Contact
          </Link>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button asChild variant="outline" className="w-full justify-center">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="w-full justify-center bg-blood-500 hover:bg-blood-600">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
