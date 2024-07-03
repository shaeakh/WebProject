
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});console


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadToCloudinary = (req, res, next) => {
  if (!req.file) return next();
  const filePath = req.file.path;
  cloudinary.uploader.upload(filePath, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
    }
    req.file.cloudinaryUrl = result.secure_url;
    fs.unlinkSync(filePath); // Remove file from local storage
    next();
  });
};

module.exports = { upload, uploadToCloudinary };
