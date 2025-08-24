import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js';

import plantRoutes from "./routes/plant.routes.js"

dotenv.config();   

const app = express();




app.use(express.json());

app.use(cors());

app.use("/api",plantRoutes);

connectDB();



const PORT = process.env.PORT || 4000;

app.listen((PORT), ()=>{
    console.log(`port running on ${PORT}`);
})





