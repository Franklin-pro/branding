import request from 'supertest';
import app from '../index'; 
import userController from '../controller/product.userController';
import VerifyAccess from '../middleware/verifyAccess';
import express,{ Router } from 'express';
import { dataChecker } from '../middleware/dataCheker';
import { validator } from '../middleware/validator';
import verifyAccess from '../middleware/verifyAccess';
const router :Router = express.Router()


router.post("/",userController.createUser)
router.get("/",verifyAccess("admin"), userController.getAllUsers);
router.get("/:id", userController.getUser);
router.delete("/:id",verifyAccess("admin"),userController.deleteUser)
router.patch("/:id",verifyAccess("admin"),userController.updateUser)
router.delete("/",verifyAccess("admin"),userController.deleteAllUser)
router.post("/login",userController.LOGIN)

 export default router