import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import api from "../services/api";
import Navbar from "../components/Navbar";

// ================= 3D TILT FOOD CARD =================
function FoodCard({ food, index, onSelect }) {
  const cardRef = useRef(null);

  // Raw mouse position inside the card, normalized -0.5 -> 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springy rotation driven by mouse position (the actual "3D tilt")
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 220,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 220,
    damping: 20,
    mass: 0.5,
  });

  // Moving glare/highlight that tracks the cursor, like light hitting glass
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.20), transparent 55%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 60, rotateX: -55 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        type: "spring",
        stiffness: 140,
        damping: 18,
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(food)}
        whileHover={{ scale: 1.04 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative cursor-pointer bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-white/5 shadow-xl shadow-black/40"
      >
        {/* Image floats slightly forward in 3D space */}
        {food.image && (
          <div
            style={{ transform: "translateZ(40px)" }}
            className="relative h-48 overflow-hidden"
          >
            <img
              src={food.image}
              alt={food.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
          </div>
        )}

        {/* Name + price sit closer to the surface */}
        <div style={{ transform: "translateZ(20px)" }} className="p-4">
          <h3 className="font-bold text-white">{food.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`h-2 w-2 rounded-full ${
                food.status === "available" ? "bg-green-400" : "bg-red-400"
              }`}
            />
            <span className="text-xs text-slate-400 capitalize">
              {food.status}
            </span>
          </div>
        </div>

        {/* Price badge pops the furthest forward — the focal depth point */}
        <div
          style={{ transform: "translateZ(70px)" }}
          className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg shadow-black/30"
        >
          {food.price} ETB
        </div>

        {/* Cursor-tracked glare for a glassy, lit-from-above feel */}
        <motion.div
          style={{ background: glareBackground }}
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
        />
      </motion.div>
    </motion.div>
  );
}

function Menu() {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  // LOAD DATA
  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const fetchFoods = async () => {
    const res = await api.get("/foods");
    setFoods(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((f) => f.category?.name === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-yellow-400">Our Menu</h1>
      </section>

      {/* CATEGORY */}
      <div className="flex gap-3 justify-center flex-wrap mb-10">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded transition-colors ${
            selectedCategory === "All"
              ? "bg-yellow-400 text-black font-semibold"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded transition-colors ${
              selectedCategory === cat.name
                ? "bg-yellow-400 text-black font-semibold"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FOOD GRID */}
      <div className="grid md:grid-cols-3 gap-6 px-6 pb-20">
        {filteredFoods.map((food, index) => (
          <FoodCard
            key={food._id}
            food={food}
            index={index}
            onSelect={setSelectedFood}
          />
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedFood(null)}
          >
            {/* Perspective wrapper so the card below can rotate in 3D space */}
            <div style={{ perspective: 1400 }} className="max-w-md w-full">
              <motion.div
                initial={{ rotateY: -100, opacity: 0, scale: 0.9 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: 100, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                style={{ transformOrigin: "left center" }}
                className="bg-slate-900 w-full rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* IMAGE */}
                {selectedFood.image && (
                  <img
                    src={selectedFood.image}
                    alt={selectedFood.name}
                    className="w-full h-72 object-cover"
                  />
                )}

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-bold">{selectedFood.name}</h2>

                  <p className="text-yellow-400 font-bold">
                    {selectedFood.price} ETB
                  </p>

                  <p
                    className={
                      selectedFood.status === "available"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {selectedFood.status}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-slate-300 text-sm leading-relaxed max-h-20 overflow-y-auto">
                    {selectedFood.description || "No description available."}
                  </p>

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setSelectedFood(null)}
                    className="w-full mt-2 bg-yellow-500 text-black py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
