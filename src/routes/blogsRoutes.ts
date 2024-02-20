import express, { Router} from 'express';
import { blogsController } from '../controller/blogController';

const router:Router = express.Router();

router.post("/",blogsController.postBlogs) 
router.get("/",blogsController.getAllBlogs) 
router.get("/:id",blogsController.getOneBlogs) 
router.put("/:id",blogsController.updateBlogs) 
router.delete("/:id",blogsController.deleteOneBlogs) 
router.delete("/",blogsController.deleteAllBlogs) 
  


export default router; 