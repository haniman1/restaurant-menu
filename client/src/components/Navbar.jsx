import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Menu", to: "/" },
  { label: "About", to: "/about" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "border-yellow-400/20 bg-slate-950/95 shadow-xl shadow-black/30 backdrop-blur-md"
            : "border-white/10 bg-slate-950/70 shadow-lg shadow-black/20 backdrop-blur-sm"
        }`}
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            aria-label="Restaurant home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/10 text-lg font-black text-yellow-400 shadow-md shadow-black/20">
              R
            </span>

            <span className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-xl font-extrabold tracking-wider text-transparent sm:text-2xl">
              RESTAURANT
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                    active
                      ? "bg-yellow-400 text-black"
                      : "text-slate-200 hover:bg-slate-800 hover:text-yellow-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              to="/about"
              className="ml-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-black/25 transition-colors duration-200 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            >
              Reserve Table
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/20 bg-slate-900 text-yellow-400 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            <span className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-t border-white/10 px-4 pb-4 md:hidden"
            >
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => {
                  const active = isActive(link.to);

                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                        active
                          ? "bg-yellow-400 text-black"
                          : "bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-yellow-300"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <Link
                  to="/about"
                  className="mt-2 rounded-xl bg-yellow-400 px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-yellow-300"
                >
                  Reserve Table
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;
