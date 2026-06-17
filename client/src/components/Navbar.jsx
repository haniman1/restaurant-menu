import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 backdrop-blur-md border-b border-yellow-500/30">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" onClick={() => setOpen(false)}>
          <h1 className="text-3xl font-extrabold tracking-wider text-yellow-400 hover:text-yellow-300 transition">
            RESTAURANT
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="text-white hover:text-yellow-400 transition font-semibold"
          >
            Menu
          </Link>

          <Link
            to="/about"
            className="text-white hover:text-yellow-400 transition font-semibold"
          >
            About
          </Link>
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-yellow-400 text-3xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-slate-950 border-t border-yellow-500/20"
          >
            <div className="flex flex-col px-6 py-5 gap-5">
              <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-yellow-400 transition text-lg"
                >
                  Menu
                </Link>
              </motion.div>

              <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-yellow-400 transition text-lg"
                >
                  About
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
