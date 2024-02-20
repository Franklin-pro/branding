
import express, { Request, Response, NextFunction } from 'express';
import userRoute from './userRoute';
import blogsRoutes from './blogsRoutes'
import contactRoute from './contactRoute'
const router = express.Router();


router.use("/user",userRoute)
router.use("/contact",contactRoute)
router.use("/blog",blogsRoutes);

export { router };
