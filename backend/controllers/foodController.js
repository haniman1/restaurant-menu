import Food from "../models/Food.js";
import cloudinary from "../config/cloudinary.js";

// ================= CREATE FOOD =================
export const createFood = async (req, res) => {
  try {
    const { name, price, status, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let imageUrl = "";

    console.log("FILE:", req.file); // DEBUG

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant-foods",
      });

      imageUrl = result.secure_url;
    }

    const food = await Food.create({
      name,
      price: Number(price),
      status,
      category,
      image: imageUrl,
    });

    res.status(201).json(food);
  } catch (error) {
    console.error("CREATE FOOD ERROR:", error);

    res.status(500).json({
      message: error.message,
      error: String(error),
    });
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
    const { name, price, status, category } = req.body;

    let updatedData = {
      name,
      price,
      status,
      category,
    };

    // If new image uploaded → replace old one
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant-foods",
      });

      updatedData.image = result.secure_url;
    }

    const food = await Food.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json(food);
  } catch (error) {
    console.error("UPDATE FOOD ERROR:", error);

    res.status(500).json({
      message: error.message,
      error: String(error),
    });
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
