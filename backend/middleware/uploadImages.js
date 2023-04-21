const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

// Set up storage configuration for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'foodservicephotos', // Folder name in cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
    transformation: [{ width: 300, crop: 'scale' }] // Transformation options for images
  }
});

// Set up multer instance with storage configuration
const upload = multer({ storage: storage });

// Middleware function to handle file uploads
const uploadImages = upload.array('images', 5); // Handle up to 5 files with name 'images'

module.exports = { uploadImages };
