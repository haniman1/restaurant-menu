import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // LOAD DATA
  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // FILTER FOODS
  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((food) => food.category?.name === selectedCategory);

  // 3D TILT HANDLERS (for product card animation)
  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateY =
      ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
    const rotateX =
      ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
  };

  const handleTiltLeave = (e) => {
    e.currentTarget.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 animate-pulse">
          Our Menu
        </h1>

        <p className="text-slate-400 mt-4 text-lg">
          Fresh • Delicious • Made With Love
        </p>
      </section>

      {/* CATEGORY BUTTONS */}
      <div className="flex gap-3 justify-center flex-wrap mb-10 px-4">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 rounded-lg transition-all duration-300 ${
            selectedCategory === "All"
              ? "bg-yellow-500 text-black"
              : "bg-slate-800 hover:bg-yellow-500 hover:text-black"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-5 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === cat.name
                ? "bg-yellow-500 text-black"
                : "bg-slate-800 hover:bg-yellow-500 hover:text-black"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FOOD CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 px-4 sm:px-6 pb-20">
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            style={{
              transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
            }}
            className="group bg-slate-900 rounded-2xl overflow-hidden shadow-lg shadow-black/40 hover:shadow-yellow-500/20 [transform-style:preserve-3d] will-change-transform active:scale-95"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={food.image}
                alt={food.name}
                onClick={() => setSelectedImage(food.image)}
                className="absolute inset-0 h-full w-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
              />
              {/* glossy sweep highlight for the 3D feel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* DETAILS (COMPRESSED: name + price + status + category) */}
            <div className="px-2.5 py-2">
              <div className="flex justify-between items-baseline gap-1.5">
                <h3 className="text-sm sm:text-base font-semibold truncate">
                  {food.name}
                </h3>

                <span className="text-yellow-400 font-bold text-xs sm:text-sm whitespace-nowrap">
                  {food.price} ETB
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                    food.status === "available"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      food.status === "available"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  />
                  {food.status}
                </span>

                {food.category?.name && (
                  <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[11px] text-slate-300 truncate">
                    {food.category.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Food Preview"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
