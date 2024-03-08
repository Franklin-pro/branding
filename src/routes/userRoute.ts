import request from 'supertest';
import app from '../index'; 
import userController from '../controller/product.userController';
import VerifyAccess from '../middleware/verifyAccess';
import express,{ Router } from 'express';
import { dataChecker } from '../middleware/dataCheker';
import { validator } from '../middleware/validator';
const router :Router = express.Router()


router.post("/",dataChecker.inputIsEmpty,dataChecker.EmailExist,validator.userAccount(),validator.InputValidator,userController.createUser)
router.get("/",VerifyAccess("admin"), userController.getAllUsers);
router.get("/:id", userController.getUser);
router.delete("/:id",userController.deleteUser)
router.patch("/:id",userController.updateUser)
router.delete("/",userController.deleteAllUser)
router.post("/login",userController.LOGIN)

 export default router