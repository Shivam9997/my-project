const cloudinary = require("cloudinary").v2;
const multerStorage = require("multer-storage-cloudinary");

// 👇 works for both v1 and v2+
const CloudinaryStorage =
  multerStorage.CloudinaryStorage || multerStorage;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

module.exports = { cloudinary, storage };
