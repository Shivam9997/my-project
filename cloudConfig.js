const cloudinary = require("cloudinary");
const multerStorage = require("multer-storage-cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new multerStorage.CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "wanderlust_listings",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

module.exports = {
  cloudinary: cloudinary.v2,
  storage,
};

