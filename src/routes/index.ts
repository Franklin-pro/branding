
import express, { Request, Response, NextFunction } from 'express';
import userRoute from './userRoute';
import blogsRoutes from './blogsRoutes'
import contactRoute from './contactRoute'
import commentRoutes from './commentRoutes'
const router = express.Router();


router.use("/user",userRoute)
router.use("/contact",contactRoute)
router.use("/blog",blogsRoutes);
router.use("/comment",commentRoutes);

export { router };
