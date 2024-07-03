const express = require('express');
const {protect} = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const router = express.Router();