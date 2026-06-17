import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
("API KEY:", process.env.CLOUDINARY_API_KEY);
("API SECRET:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
