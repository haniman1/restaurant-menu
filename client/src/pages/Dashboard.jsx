import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

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

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

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

  const imagePreview = useMemo(() => {
    if (image) return URL.createObjectURL(image);
    return editingFood?.image || "";
  }, [image, editingFood]);

  useEffect(() => {
    return () => {
      if (imagePreview && image) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview, image]);

  const stats = useMemo(() => {
    const availableFoods = foods.filter((food) => food.status === "available");
    const unavailableFoods = foods.filter(
      (food) => food.status === "unavailable",
    );

    return [
      { label: "Total Foods", value: foods.length },
      { label: "Total Categories", value: categories.length },
      { label: "Available Foods", value: availableFoods.length },
      { label: "Unavailable Foods", value: unavailableFoods.length },
    ];
  }, [foods, categories]);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const foodCategoryId = food.category?._id || food.category;
      const foodCategoryName = food.category?.name || "";

      const matchesSearch = food.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        foodCategoryId === categoryFilter ||
        foodCategoryName === categoryFilter;

      const matchesStatus =
        statusFilter === "all" || food.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [foods, searchTerm, categoryFilter, statusFilter]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

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

  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");
      setFoods(res.data);
    } catch (err) {
      toast.error("Failed to load foods");
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return toast.error("Enter category name");

    try {
      await api.post("/categories", { name: newCategory.trim() });
      setNewCategory("");
      fetchCategories();
      toast.success("Category added");
    } catch (err) {
      toast.error("Failed to add category");
    }
  };

  const addFood = async () => {
    if (!foodName.trim() || !price || !category) {
      return toast.error("Fill all required fields");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", foodName.trim());
      formData.append("price", Number(price));
      formData.append("status", status);
      formData.append("category", category);
      formData.append("description", foodDescription.trim());

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

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this food?")) return;

    try {
      await api.delete(`/foods/${id}`);
      setFoods((prev) => prev.filter((food) => food._id !== id));
      toast.success("Food deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const startEdit = (food) => {
    setEditingFood(food);
    setFoodName(food.name || "");
    setFoodDescription(food.description || "");
    setPrice(food.price || "");
    setStatus(food.status || "available");
    setCategory(food.category?._id || food.category || "");
    setImage(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateFood = async () => {
    if (!editingFood) return;

    if (!foodName.trim() || !price || !category) {
      return toast.error("Fill all required fields");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", foodName.trim());
      formData.append("price", Number(price));
      formData.append("status", status);
      formData.append("category", category);
      formData.append("description", foodDescription.trim());

      if (image) formData.append("image", image);

      const res = await api.put(`/foods/${editingFood._id}`, formData);

      setFoods((prev) =>
        prev.map((food) => (food._id === editingFood._id ? res.data : food)),
      );

      resetForm();
      toast.success("Food updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFoodName("");
    setFoodDescription("");
    setPrice("");
    setStatus("available");
    setImage(null);
    setEditingFood(null);

    if (categories.length > 0) {
      setCategory(categories[0]._id);
    }
  };

  const getCategoryName = (food) => {
    if (food.category?.name) return food.category.name;

    const matchedCategory = categories.find((cat) => cat._id === food.category);

    return matchedCategory?.name || "Uncategorized";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.header
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <Link
              to="/"
              className="text-sm font-medium text-yellow-400 hover:text-yellow-300"
            >
              Back to restaurant
            </Link>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Welcome back. Manage foods, categories, pricing, and availability.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-slate-800 px-3 py-1">
                {foods.length} foods
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1">
                {categories.length} categories
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </motion.header>

        {loading && (
          <div className="mb-6 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
            Saving changes...
          </div>
        )}

        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/20 transition"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20"
          >
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingFood ? "Edit Food" : "Add Food"}
                </h2>
                <p className="text-sm text-slate-400">
                  Create or update menu items from one clean form.
                </p>
              </div>

              {editingFood && (
                <button
                  onClick={resetForm}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">
                      Food name
                    </span>
                    <input
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400"
                      placeholder="Grilled salmon"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">
                      Price
                    </span>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400"
                      placeholder="450"
                      type="number"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Description
                  </span>
                  <textarea
                    value={foodDescription}
                    onChange={(e) => setFoodDescription(e.target.value)}
                    className="min-h-28 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400"
                    placeholder="Short menu description..."
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">
                      Status
                    </span>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">
                      Category
                    </span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                    >
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Food image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full rounded-xl border border-dashed border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:px-4 file:py-2 file:font-semibold file:text-black hover:border-yellow-400/60"
                  />
                </label>

                <button
                  onClick={editingFood ? updateFood : addFood}
                  disabled={loading}
                  className="w-full rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editingFood ? "Update Food" : "Add Food"}
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <div className="flex h-full min-h-56 items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Food preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="px-4 text-center text-sm text-slate-500">
                      Image preview will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.aside
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20"
          >
            <h2 className="text-xl font-bold text-white">Categories</h2>
            <p className="mt-1 text-sm text-slate-400">
              {categories.length} categories available.
            </p>

            <div className="mt-5 space-y-3">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addCategory();
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400"
                placeholder="Category name"
              />

              <button
                onClick={addCategory}
                className="w-full rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                Add Category
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat._id}
                  className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-sm text-yellow-300"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20"
        >
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Food Management</h2>
              <p className="text-sm text-slate-400">
                Showing {filteredFoods.length} of {foods.length} foods.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[680px]">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400"
                placeholder="Search food..."
              />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
              >
                <option value="all">All categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
              >
                <option value="all">All status</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-slate-800 lg:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Food</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredFoods.map((food) => (
                  <tr
                    key={food._id}
                    className="transition hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-16 overflow-hidden rounded-xl bg-slate-800">
                          {food.image && (
                            <img
                              src={food.image}
                              alt={food.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {food.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-300">
                      {getCategoryName(food)}
                    </td>

                    <td className="px-4 py-4 font-semibold text-yellow-400">
                      {food.price} ETB
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          food.status === "available"
                            ? "bg-green-400/10 text-green-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {food.status}
                      </span>
                    </td>

                    <td className="max-w-xs px-4 py-4 text-slate-400">
                      <p className="line-clamp-2">
                        {food.description || "No description"}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(food)}
                          className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-500 hover:text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteFood(food._id)}
                          className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 lg:hidden">
            {filteredFoods.map((food) => (
              <div
                key={food._id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                    {food.image && (
                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-white">
                      {food.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {getCategoryName(food)}
                    </p>
                    <p className="mt-1 font-semibold text-yellow-400">
                      {food.price} ETB
                    </p>
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-sm text-slate-400">
                  {food.description || "No description"}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      food.status === "available"
                        ? "bg-green-400/10 text-green-300"
                        : "bg-red-400/10 text-red-300"
                    }`}
                  >
                    {food.status}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(food)}
                      className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFood(food._id)}
                      className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
              No foods match your search or filters.
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
}

export default Dashboard;
