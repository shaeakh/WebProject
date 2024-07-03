const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const auctionRouter = require('./auction_routes/auctionRoutes');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const cors=require("cors");


require('dotenv').config();

const corsOptions ={
   origin:'http://localhost:3000', 
   credentials:true,           
   optionSuccessStatus:200,
}



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/auction', auctionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
