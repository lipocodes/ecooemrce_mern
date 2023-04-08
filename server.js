import express from "express";
import color from "color";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors'
import categoryRoute from './routes/categoryRoute.js';
import productRoutes from './routes/productRoutes.js';

//config dotenv
dotenv.config({});

//DB config
connectDB();

//REST object
const app = express();

//middlewares 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoutes);


app.get('/',(req,res)=>{res.send('<h1>Welcome to Ecommerce app!</h1>');});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, ()=>{
 console.log(`Server is running on ${process.env.DEV_MODE} mode and in PORT ${PORT}`);
})