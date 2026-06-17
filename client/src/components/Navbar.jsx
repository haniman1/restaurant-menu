import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-yellow-500/30 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" onClick={() => setOpen(false)}>
          <motion.h1
            whileHover={{ rotateX: 10, rotateY: -8, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 250, damping: 12 }}
            style={{ transformPerspective: 500, transformStyle: "preserve-3d" }}
            className="text-3xl font-extrabold tracking-wider text-yellow-400 [text-shadow:0_1px_0_#7a5b00,0_2px_0_#5c4400,0_3px_6px_rgba(0,0,0,0.5)]"
          >
            RESTAURANT
          </motion.h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          <motion.div
            whileHover={{ y: -3, rotateX: -10 }}
            style={{ transformPerspective: 400 }}
            className="relative group"
          >
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition font-semibold"
            >
              Menu
            </Link>
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-yellow-400 scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-300" />
          </motion.div>

          <motion.div
            whileHover={{ y: -3, rotateX: -10 }}
            style={{ transformPerspective: 400 }}
            className="relative group"
          >
            <Link
              to="/about"
              className="text-white hover:text-yellow-400 transition font-semibold"
            >
              About
            </Link>
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-yellow-400 scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-300" />
          </motion.div>
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          style={{ perspective: 300 }}
          className="md:hidden relative w-9 h-9 flex items-center justify-center text-yellow-400 text-3xl"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute"
            >
              {open ? "✕" : "☰"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, rotateX: -90 }}
            animate={{ height: "auto", opacity: 1, rotateX: 0 }}
            exit={{ height: 0, opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top", transformPerspective: 800 }}
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
