import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { router as userRoute } from './routes/index';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1",userRoute)

// app.listen(port,()=>{
//     console.log(`server runnng on ${port}`)
// })


async function startServer() {
    await app.listen(port);
    console.log(`The application is listening on port ${port}!`);

    // Connect to the database
    const connect_database_mongoDb = "mongodb+srv://franklinprogrammer:frank123@frank.badhlha.mongodb.net/brand"; 
    try {
        await mongoose.connect(connect_database_mongoDb);
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1); 
    }
}

startServer();

