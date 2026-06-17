import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" onClick={() => setOpen(false)}>
          <h1 className="text-3xl font-extrabold tracking-wider text-yellow-400">
            RESTAURANT
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-lg font-semibold text-white hover:text-yellow-400 transition"
          >
            Menu
          </Link>

          <Link
            to="/about"
            className="text-lg font-semibold text-white hover:text-yellow-400 transition"
          >
            About
          </Link>
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          className="md:hidden text-yellow-400 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-yellow-500/20 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-white text-lg hover:text-yellow-400"
          >
            Menu
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="text-white text-lg hover:text-yellow-400"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
