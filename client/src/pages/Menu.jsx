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
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 px-6 pb-20">
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className="bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-yellow-500/20 transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                onClick={() => setSelectedImage(food.image)}
                className="h-52 w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* DETAILS (COMPACT) */}
            <div className="p-2">
              {/* NAME + PRICE SAME LINE */}
              <div className="flex justify-between items-center gap-1">
                <h3 className="text-base font-semibold truncate">
                  {food.name}
                </h3>

                <span className="text-yellow-400 font-semibold text-sm whitespace-nowrap">
                  {food.price} ETB
                </span>
              </div>

              {/* STATUS (SMALL) */}
              <p
                className={`text-xs mt-2 ${
                  food.status === "available"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {food.status}
              </p>

              {/* CATEGORY */}
              {food.category?.name && (
                <div className="mt-2">
                  <span className="bg-slate-800 px-2 py-1 rounded-full text-xs">
                    {food.category.name}
                  </span>
                </div>
              )}
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
