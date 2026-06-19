import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Navbar from "../components/Navbar";
import restaurantData from "../datas/restaurantData";

const heroImage =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85";

const chefImage =
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85";

const gallery = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=85",
];

const timeline = [
  {
    year: "2016",
    title: "The Beginning",
    text: "We opened with a simple belief: every plate should carry warmth, craft, and a memorable sense of place.",
  },
  {
    year: "2019",
    title: "Signature Cuisine",
    text: "Our kitchen developed a refined menu built around seasonal ingredients, elegant plating, and bold flavor.",
  },
  {
    year: "2022",
    title: "Guest Experience",
    text: "We shaped our dining room into a destination for celebrations, private dinners, and intimate evenings.",
  },
  {
    year: "Today",
    title: "A Luxury Standard",
    text: "We continue to serve polished hospitality with thoughtful details, beautiful food, and timeless atmosphere.",
  },
];

const values = [
  "Quality Ingredients",
  "Customer Experience",
  "Passion For Food",
  "Sustainability",
];

const stats = [
  ["8+", "Years Experience"],
  ["25K+", "Happy Customers"],
  ["40+", "Signature Dishes"],
  ["12", "Awards Won"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function About() {
  const { features, about, contact, social } = restaurantData;
  const [activeImage, setActiveImage] = useState(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), {
    stiffness: 90,
    damping: 28,
  });

  return (
    <div className="min-h-screen bg-[#080705] text-white">
      <Navbar />

      <main className="overflow-hidden">
        {/* HERO */}
        <section
          ref={heroRef}
          className="relative flex min-h-[92vh] items-center px-6 py-24"
        >
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src={heroImage}
              alt="Luxury restaurant interior"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080705] via-transparent to-black/30" />
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(245,158,11,0.22),transparent_32%)]" />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative mx-auto max-w-7xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400"
            >
              Luxury Restaurant
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl"
            >
              A dining story crafted with flavor, elegance, and soul.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
            >
              {about}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-3"
            >
              {["Chef-led kitchen", "Premium service", "Seasonal menu"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-yellow-400/20 bg-white/10 px-5 py-2 text-sm text-yellow-100 backdrop-blur-md"
                  >
                    {item}
                  </span>
                ),
              )}
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-yellow-300 md:block"
          >
            Scroll
          </motion.div>
        </section>

        {/* STORY */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                Our Story
              </p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Built on craft, care, and unforgettable hospitality.
              </h2>
            </motion.div>

            <div className="relative mt-16 space-y-8">
              <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-yellow-400 to-transparent md:left-1/2 md:block" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className={`grid md:grid-cols-2 ${
                    index % 2 ? "md:[&>div]:col-start-2" : ""
                  }`}
                >
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:-translate-y-1 hover:border-yellow-400/30">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                      {item.year}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
                    <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CHEF */}
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl"
            >
              <img
                src={chefImage}
                alt="Executive chef"
                className="h-[32rem] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
                  Executive Chef
                </p>
                <h3 className="mt-2 text-2xl font-bold">Chef Aman Tesfaye</h3>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                Meet Our Chef
              </p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Precision, passion, and a refined respect for ingredients.
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                Our chef brings years of fine-dining experience to every dish,
                balancing modern technique with comforting flavors and elegant
                presentation.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  "15 years experience",
                  "Seasonal menus",
                  "Signature plating",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-sm text-slate-200 backdrop-blur-xl"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* VALUES */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
              Mission & Values
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
              Every detail is designed to make dining feel exceptional.
            </h2>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {values.map((value) => (
                <motion.div
                  key={value}
                  variants={fadeUp}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-7 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-yellow-400/40"
                >
                  <div className="mb-6 h-12 w-12 rounded-full border border-yellow-400/30 bg-yellow-400/10" />
                  <h3 className="text-xl font-bold">{value}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    We bring discipline, care, and taste to every guest
                    experience.
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.06] p-5 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <motion.div
                key={label}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-black/30 p-7 text-center"
              >
                <p className="text-4xl font-bold text-yellow-400">{value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                Gallery
              </p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                A glimpse into the experience.
              </h2>
            </div>

            <div className="mt-12 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.map((image, index) => (
                <motion.button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 outline-none focus:ring-2 focus:ring-yellow-400 ${
                    index === 0 || index === 3 ? "lg:col-span-2" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt="Restaurant gallery"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
                  <p className="absolute bottom-5 left-5 font-semibold text-white">
                    View Image
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                Why Choose Us
              </p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Premium service from kitchen to table.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl transition hover:border-yellow-400/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                    {f.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{f.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / CONTACT */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/15 via-white/[0.06] to-black/40 p-8 backdrop-blur-xl md:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                  Visit Us
                </p>
                <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                  Reserve a table for your next unforgettable meal.
                </h2>
                <p className="mt-5 leading-8 text-slate-300">
                  Contact us for reservations, private dining, and special
                  occasions.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`tel:${contact.phone}`}
                    className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white"
                  >
                    Reservation
                  </a>
                  <a
                    href="/menu"
                    className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/20"
                  >
                    Explore Menu
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-slate-300">
                <p>Address: {contact.address}</p>
                <p className="mt-2">
                  Phone:{" "}
                  <a className="text-yellow-400" href={`tel:${contact.phone}`}>
                    {contact.phone}
                  </a>
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    className="text-yellow-400"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </p>
                <p className="mt-2">Open: {contact.openHours.weekdays}</p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a href={social.instagram} className="text-yellow-400">
                    Instagram
                  </a>
                  <a href={social.facebook} className="text-yellow-400">
                    Facebook
                  </a>
                  <a href={social.tiktok} className="text-yellow-400">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-black/60 text-xl text-white"
                aria-label="Close image"
              >
                ×
              </button>
              <img
                src={activeImage}
                alt="Restaurant preview"
                className="max-h-[82vh] w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
