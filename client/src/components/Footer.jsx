// client/src/components/Footer.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FiArrowUp, FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import restaurantData from "../datas/restaurantData";

const footerVariants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Footer() {
  const { contact = {}, social = {}, about } = restaurantData;
  const [email, setEmail] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);

  const currentYear = new Date().getFullYear();

  const isOpenNow = useMemo(() => {
    const hour = new Date().getHours();
    return hour >= 9 && hour < 22;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setEmail("");
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phone = contact.phone || "+251 900 000 000";
  const whatsapp = contact.whatsapp || phone;
  const emailAddress = contact.email || "hello@restaurant.com";
  const address = contact.address || "Addis Ababa, Ethiopia";

  const socialLinks = [
    {
      label: "Facebook",
      href: social.facebook || "",
      icon: FaFacebookF,
    },
    {
      label: "Instagram",
      href: social.instagram || `https://www.instagram.com/hanie_labate?igsh=NXc5ZnhqcjdrNnM5`,
      icon: FaInstagram,
    },
    {
      label: "Telegram",
      href: social.telegram || `t.me/Be0944`,
      icon: FaTelegramPlane,
    },
    {
      label: "TikTok",
      href: social.tiktok || "#",
      icon: FaTiktok,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
      icon: FaWhatsapp,
    },
  ];

  return (
    <>
      <motion.footer
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={footerVariants}
        className="relative overflow-hidden border-t border-yellow-400/10 bg-slate-950 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_30%)]" />

        <motion.div
          variants={itemVariants}
          className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"
        />

        <div className="relative mx-auto grid max-w-7xl gap-6 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-xl font-black text-yellow-400">
                R
              </span>
              <span className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-2xl font-extrabold tracking-wider text-transparent">
                RESTAURANT
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              {about ||
                "A premium dining experience built around fresh ingredients, elegant service, and unforgettable flavor."}
            </p>

            <p className="mt-5 text-sm font-semibold text-yellow-400">
              Fresh • Delicious • Made With Love
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <a
                href={`tel:${phone}`}
                className="flex gap-3 transition hover:text-yellow-400"
              >
                <FiPhone className="mt-0.5 shrink-0 text-yellow-400" />
                <span>{phone}</span>
              </a>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
                className="flex gap-3 transition hover:text-yellow-400"
              >
                <FaWhatsapp className="mt-0.5 shrink-0 text-yellow-400" />
                <span>{whatsapp}</span>
              </a>

              <a
                href={`mailto:${emailAddress}`}
                className="flex gap-3 transition hover:text-yellow-400"
              >
                <FiMail className="mt-0.5 shrink-0 text-yellow-400" />
                <span>{emailAddress}</span>
              </a>

              <p className="flex gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-yellow-400" />
                <span>{address}</span>
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">
              Opening Hours
            </h3>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-md">
              <div className="mb-4 flex items-center gap-2">
                <FiClock className="text-yellow-400" />
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isOpenNow
                      ? "bg-green-400/10 text-green-300"
                      : "bg-red-400/10 text-red-300"
                  }`}
                >
                  {isOpenNow ? "Open Now" : "Closed Now"}
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between gap-4">
                  <span>Monday–Friday</span>
                  <span className="text-slate-400">
                    {contact.openHours?.weekdays || "9:00 AM - 10:00 PM"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Saturday–Sunday</span>
                  <span className="text-slate-400">
                    {contact.openHours?.weekend || "10:00 AM - 11:00 PM"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">
              Stay Connected
            </h3>

            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-300 shadow-lg shadow-black/20 transition hover:border-yellow-400/40 hover:bg-yellow-400 hover:text-black"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            <div className="mt-7">
              <h4 className="text-sm font-semibold text-white">Quick Links</h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-400">
                <Link to="/" className="transition hover:text-yellow-400">
                  Menu
                </Link>
                <Link to="/about" className="transition hover:text-yellow-400">
                  About
                </Link>
                <a href="#contact" className="transition hover:text-yellow-400">
                  Contact
                </a>
                <Link to="/login" className="transition hover:text-yellow-400">
                  Admin Login
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative mx-auto max-w-7xl px-6 pb-10 lg:px-8"
        >
          <form
            onSubmit={handleSubscribe}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="mb-4 sm:mb-0">
              <h3 className="font-bold text-white">Join our newsletter</h3>
              <p className="mt-1 text-sm text-slate-400">
                Get menu updates, offers, and special dining announcements.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:min-w-[360px] sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email address"
                className="min-h-12 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400"
              />

              <button
                type="submit"
                className="min-h-12 rounded-xl bg-yellow-400 px-5 text-sm font-bold text-black transition hover:bg-yellow-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </motion.div>

        <div className="relative border-t border-white/10 px-6 py-5">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear} Restaurant. All rights reserved.</p>
            <p>Crafted for premium dining experiences.</p>
          </div>
        </div>
      </motion.footer>

      {showTopButton && (
        <motion.button
          type="button"
          onClick={backToTop}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ y: -3 }}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-black shadow-xl shadow-black/30 transition hover:bg-yellow-300"
          aria-label="Back to top"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </>
  );
}

export default Footer;
