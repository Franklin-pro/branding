import express, { Router} from 'express';
import { blogsController } from '../controller/product.blogController';
import VerifyAccess from '../middleware/verifyAccess';
import upload from '../validation/upload';
import verifyAccess from '../middleware/verifyAccess';

const router:Router = express.Router();

router.post("/",blogsController.postBlogs) 
router.post("/post",upload.single("image"),blogsController.postBlogs)
router.get("/",blogsController.getAllBlogs) 
router.get("/:id",blogsController.getOneBlogs) 
router.put("/:id",verifyAccess("admin"),blogsController.updateBlogs) 
router.delete("/:id",VerifyAccess("admin"),blogsController.deleteOneBlogs) 
router.delete("/",verifyAccess("admin"),blogsController.deleteAllBlogs) 
router.post("/like/:id",blogsController.likeBlog)
router.post("/unlike/:id",blogsController.unlikeBlog)
  


export default router; 