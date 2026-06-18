import Food from "../models/Food.js";
import cloudinary from "../config/cloudinary.js";

// ================= CREATE FOOD =================
export const createFood = async (req, res) => {
  try {
    const { name, price, status, category, description } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant-foods",
      });

      imageUrl = result.secure_url;
    }

    const food = await Food.create({
      name,
      description,
      price: Number(price),
      status,
      category,
      image: imageUrl,
    });

    res.status(201).json(food);
  } catch (error) {
    console.error("CREATE FOOD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET FOODS =================
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("category");
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE FOOD =================
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("BODY RECEIVED:", req.body); // 🔥 CHECK THIS

    const updateData = {
      name: req.body.name,
      price: Number(req.body.price),
      status: req.body.status,
      category: req.body.category,
      description: req.body.description || "", // 🔥 IMPORTANT FIX
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant-foods",
      });

      updateData.image = result.secure_url;
    }

    const food = await Food.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // 🔥 IMPORTANT
    });

    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE FOOD =================
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    await Food.findByIdAndDelete(id);

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
