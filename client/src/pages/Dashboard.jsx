import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  const [newCategory, setNewCategory] = useState("");

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("available");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [foodDescription, setFoodDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  // ================= PROTECT =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      window.location.href = "/login";
      return;
    }

    fetchCategories();
    fetchFoods();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  // ================= CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);

      if (!category && res.data.length > 0) {
        setCategory(res.data[0]._id);
      }
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  // ================= FOODS =================
  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");
      setFoods(res.data);
    } catch (err) {
      toast.error("Failed to load foods");
    }
  };

  // ================= ADD CATEGORY =================
  const addCategory = async () => {
    if (!newCategory.trim()) return toast.error("Enter category name");

    try {
      await api.post("/categories", { name: newCategory });
      setNewCategory("");
      fetchCategories();
      toast.success("Category added");
    } catch (err) {
      toast.error("Failed to add category");
    }
  };

  // ================= ADD FOOD =================
  const addFood = async () => {
    if (!foodName || !price || !category) {
      return toast.error("Fill all fields");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", foodName);
      formData.append("price", Number(price));
      formData.append("status", status);
      formData.append("category", category);
      formData.append("description", foodDescription); // ✅ FIX

      if (image) formData.append("image", image);

      const res = await api.post("/foods", formData);

      setFoods((prev) => [...prev, res.data]);

      resetForm();

      toast.success("Food added successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE FOOD =================
  const deleteFood = async (id) => {
    if (!window.confirm("Delete this food?")) return;

    try {
      await api.delete(`/foods/${id}`);
      setFoods((prev) => prev.filter((f) => f._id !== id));
      toast.success("Food deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ================= EDIT =================
  const startEdit = (food) => {
    setEditingFood(food);

    setFoodName(food.name);
    setFoodDescription(food.description || ""); // ✅ FIX
    setPrice(food.price);
    setStatus(food.status);
    setCategory(food.category?._id || food.category);
    setImage(null); // 🔥 important reset
  };

  // ================= UPDATE FOOD =================
  const updateFood = async () => {
    if (!editingFood) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", foodName);
      formData.append("price", Number(price));
      formData.append("status", status);
      formData.append("category", category);
      formData.append("description", foodDescription || ""); // 🔥 force safe value

      if (image) formData.append("image", image);

      const res = await api.put(`/foods/${editingFood._id}`, formData);

      setFoods((prev) =>
        prev.map((f) => (f._id === editingFood._id ? res.data : f)),
      );

      resetForm();
      toast.success("Food updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================
  const resetForm = () => {
    setFoodName("");
    setFoodDescription(""); // correct
    setPrice("");
    setStatus("available");
    setImage(null);
    setEditingFood(null);
  };
  // ================= UI =================
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <Link to="/">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {loading && <p className="text-yellow-400 mb-4">Loading...</p>}

      {/* CATEGORY */}
      <div className="bg-slate-800 p-6 rounded-xl mb-6">
        <h2 className="text-2xl mb-4">Add Category</h2>

        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-3 w-full bg-slate-700 rounded mb-3"
          placeholder="Category Name"
        />

        <button
          onClick={addCategory}
          className="bg-yellow-500 text-black px-6 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* FOOD FORM */}
      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-2xl mb-4">
          {editingFood ? "Edit Food" : "Add Food"}
        </h2>

        <div className="space-y-4">
          <input
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="p-3 w-full bg-slate-700 rounded"
            placeholder="Food Name"
          />

          <textarea
            value={foodDescription}
            onChange={(e) => setFoodDescription(e.target.value)}
            className="p-3 w-full bg-slate-700 rounded"
            placeholder="Food Description"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 w-full bg-slate-700 rounded"
            placeholder="Price"
            type="number"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-3 w-full bg-slate-700 rounded"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 w-full bg-slate-700 rounded"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 w-full bg-slate-700 rounded"
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={editingFood ? updateFood : addFood}
            className="bg-yellow-500 text-black px-6 py-3 rounded w-full"
          >
            {editingFood ? "Update Food" : "Add Food"}
          </button>
        </div>
      </div>

      {/* FOODS LIST */}
      <div className="mt-10">
        <h2 className="text-2xl mb-4">Foods</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {foods.map((food) => (
            <div key={food._id} className="bg-slate-800 p-4 rounded">
              {food.image && (
                <img
                  src={food.image}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}

              <h3 className="font-bold">{food.name}</h3>
              <p>{food.price} ETB</p>
              <p>{food.status}</p>

              {food.description && (
                <p className="text-slate-300 text-sm mt-2">
                  {food.description}
                </p>
              )}

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => startEdit(food)}
                  className="bg-blue-500 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteFood(food._id)}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
