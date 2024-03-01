
import express, { Request, Response, NextFunction } from 'express';
import userRoute from './userRoute';
import blogsRoutes from './blogsRoutes'
import contactRoute from './contactRoute'
import commentRoutes from './commentRoutes'
const router = express.Router();


router.use("/user",userRoute
 /*
#swagger.tags = ['USERS API']
*/
)
router.use("/contact",contactRoute
/*
#swagger.tags = ['CONTACTS API']
*/
)
router.use("/blog",blogsRoutes
/*
#swagger.tags = ['BLOGS API']
*/
);
router.use("/comment",commentRoutes
/*
#swagger.tags = ['COMMENTS API']
*/
);

export { router };
