import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  // LOAD DATA FROM BACKEND
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

  // FILTER LOGIC
  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((f) => f.category?.name === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-yellow-400">Our Menu</h1>
      </section>

      {/* CATEGORIES */}
      <div className="flex gap-3 justify-center flex-wrap mb-10">
        <button
          onClick={() => setSelectedCategory("All")}
          className="px-4 py-2 bg-slate-800 rounded"
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className="px-4 py-2 bg-slate-800 rounded"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FOODS */}
      <div className="grid md:grid-cols-3 gap-6 px-6 pb-20">
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className="bg-slate-900 rounded-xl overflow-hidden"
          >
            <img
              src={food.image}
              className="h-48 w-full object-cover"
              alt={food.name}
            />

            <div className="p-4">
              <h3 className="text-xl font-bold">{food.name}</h3>
              <p className="text-yellow-400">{food.price} ETB</p>

              <p
                className={
                  food.status === "available"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {food.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
