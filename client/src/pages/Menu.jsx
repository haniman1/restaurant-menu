import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.96,
    transition: { duration: 0.18 },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 28 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 170, damping: 22 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 18,
    transition: { duration: 0.18 },
  },
};

function getCategoryName(food) {
  return food?.category?.name || food?.category || "Chef Selection";
}

function formatPrice(price) {
  if (price === undefined || price === null || price === "")
    return "Market price";
  return `${price} ETB`;
}

function FoodCard({ food, index, onSelect }) {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 220,
    damping: 24,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 220,
    damping: 24,
  });

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 42%)`;

  const available = food.status === "available";

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      variants={cardVariants}
      layout
      custom={index}
      style={{ perspective: 1200 }}
      className="group"
    >
      <motion.button
        ref={cardRef}
        type="button"
        onClick={() => onSelect(food)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.985 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative block h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#12100d] text-left shadow-2xl shadow-black/30 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/50" />

        <div className="relative h-64 overflow-hidden sm:h-72">
          {food.image ? (
            <motion.img
              src={food.image}
              alt={food.name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950 text-sm uppercase tracking-[0.32em] text-amber-200/70">
              Signature Dish
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-[#12100d]/20 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-100 backdrop-blur-md">
            {getCategoryName(food)}
          </div>

          <div className="absolute right-4 top-4 rounded-full bg-amber-300 px-4 py-2 text-sm font-bold text-stone-950 shadow-lg shadow-black/30">
            {formatPrice(food.price)}
          </div>
        </div>

        <div className="relative space-y-4 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {food.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-300">
                {food.description ||
                  "A refined house favorite prepared with premium ingredients."}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  available
                    ? "bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]"
                    : "bg-rose-400"
                }`}
              />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone-300">
                {available ? "Available" : "Unavailable"}
              </span>
            </div>

            <span className="text-sm font-semibold text-amber-200 transition-transform duration-300 group-hover:translate-x-1">
              View details
            </span>
          </div>
        </div>

        <motion.div
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
        />
      </motion.button>
    </motion.article>
  );
}

function Menu() {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMenu = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [foodsRes, categoriesRes] = await Promise.all([
          api.get("/foods"),
          api.get("/categories"),
        ]);

        if (!isMounted) return;

        setFoods(Array.isArray(foodsRes.data) ? foodsRes.data : []);
        setCategories(
          Array.isArray(categoriesRes.data) ? categoriesRes.data : [],
        );
      } catch (err) {
        if (!isMounted) return;
        setError(
          "We could not load the menu right now. Please try again shortly.",
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedFood) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setSelectedFood(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedFood]);

  const categoryOptions = useMemo(
    () => [
      "All",
      ...categories.map((category) => category.name).filter(Boolean),
    ],
    [categories],
  );

  const filteredFoods = useMemo(() => {
    if (selectedCategory === "All") return foods;
    return foods.filter((food) => getCategoryName(food) === selectedCategory);
  }, [foods, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0d0b08] text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-5 pb-10 pt-16 sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0b08] to-transparent" />

          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">
                Curated Dining
              </p>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Our Menu
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                Explore chef-led dishes, polished classics, and seasonal
                favorites crafted for a premium dining experience.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="sticky top-0 z-30 border-y border-white/10 bg-[#0d0b08]/85 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryOptions.map((category) => {
              const active = selectedCategory === category;

              return (
                <motion.button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  layout
                  whileTap={{ scale: 0.96 }}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "text-stone-950"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-full bg-amber-300 shadow-lg shadow-amber-950/30"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="px-5 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            {error && (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-950/30 p-5 text-sm text-rose-100">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[26rem] animate-pulse rounded-[1.75rem] bg-white/[0.06]"
                  />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredFoods.length > 0 ? (
                  <motion.div
                    key={selectedCategory}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {filteredFoods.map((food, index) => (
                      <FoodCard
                        key={food._id || food.name}
                        food={food}
                        index={index}
                        onSelect={setSelectedFood}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-10 text-center"
                  >
                    <h2 className="text-2xl font-semibold text-white">
                      No dishes found
                    </h2>
                    <p className="mt-3 text-stone-300">
                      Try another category to discover more from the kitchen.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedFood && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFood(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="food-detail-title"
              onClick={(event) => event.stopPropagation()}
              className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#12100d] shadow-2xl shadow-black/60 sm:rounded-[2rem]"
            >
              <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative h-80 overflow-hidden lg:h-full">
                  {selectedFood.image ? (
                    <motion.img
                      src={selectedFood.image}
                      alt={selectedFood.name}
                      className="h-full w-full object-cover"
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950 text-amber-100">
                      Signature Dish
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-transparent to-transparent lg:bg-gradient-to-r" />
                </div>

                <div className="relative p-6 sm:p-8">
                  <button
                    type="button"
                    onClick={() => setSelectedFood(null)}
                    className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl leading-none text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    aria-label="Close food details"
                  >
                    ×
                  </button>

                  <div className="pr-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                      {getCategoryName(selectedFood)}
                    </p>
                    <h2
                      id="food-detail-title"
                      className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                    >
                      {selectedFood.name}
                    </h2>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-amber-300 px-5 py-2 text-base font-bold text-stone-950">
                      {formatPrice(selectedFood.price)}
                    </span>
                    <span
                      className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize ${
                        selectedFood.status === "available"
                          ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
                          : "border-rose-300/30 bg-rose-400/10 text-rose-200"
                      }`}
                    >
                      {selectedFood.status || "Status unavailable"}
                    </span>
                  </div>

                  <p className="mt-7 text-base leading-8 text-stone-300">
                    {selectedFood.description ||
                      "A premium house selection prepared with balance, texture, and a memorable finish."}
                  </p>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
                      Chef note
                    </p>
                    <p className="mt-3 text-sm leading-6 text-stone-300">
                      Best enjoyed fresh from the kitchen. Ask our team for
                      pairing recommendations and availability.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedFood(null)}
                    className="mt-8 w-full rounded-full bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-stone-950 transition-all hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12100d]"
                  >
                    Back to menu
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default Menu;
