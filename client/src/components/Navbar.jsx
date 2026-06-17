import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold tracking-wider text-yellow-400">
            RESTAURANT
          </h1>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-lg font-semibold text-white hover:text-yellow-400 transition duration-300"
          >
            Menu
          </Link>

          <Link
            to="/about"
            className="text-lg font-semibold text-white hover:text-yellow-400 transition duration-300"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
