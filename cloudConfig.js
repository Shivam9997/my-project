const cloudinary = require("cloudinary");
const multer = require("multer");
const CloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary config:", {
  cloud: cloudinary.config().cloud_name,
  key: cloudinary.config().api_key ? "OK" : "MISSING",
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "listings",
  allowedFormats: ["jpg", "png", "jpeg"],
});

module.exports = multer({ storage });
