import express from "express";
import {
  createFood,
  getFoods,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";
import { upload } from "../middleware/multer.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFoods);

// protected + image upload
router.post("/", protect, upload.single("image"), createFood);

router.put("/:id", protect, upload.single("image"), updateFood);
router.delete("/:id", protect, deleteFood);

export default router;
