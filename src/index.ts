import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { router as userRoute } from './routes/index';
import blogRoute from './routes/blogsRoutes';
import commentRoute from './routes/commentRoutes'
import swaggerUi from "swagger-ui-express";
import swaggerOutPut from '../src/documentation/swagger_output.json'



dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutPut));

app.use("/",userRoute)




// app.listen(port,()=>{
//     console.log(`server runnng on ${port}`)
// })


async function startServer() {
    await app.listen(port);
    console.log(`The application is listening on port ${port}!`);

    // Connect to the database
    const connect_database_mongoDb = "mongodb+srv://frank:frank@king.dizpopl.mongodb.net/?retryWrites=true&w=majority&appName=king"; 
    try {
        await mongoose.connect(connect_database_mongoDb);
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1); 
    }
}

startServer();

export default app