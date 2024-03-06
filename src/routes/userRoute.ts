import request from 'supertest';
import app from '../index'; 
import { userController } from '../controller/product.userController';
import VerifyAccess from '../middleware/verifyAccess';
import express,{ Router } from 'express';
import { dataChecker } from '../middleware/dataCheker';
import { validator } from '../middleware/validator';
const router :Router = express.Router()


router.post("/",dataChecker.inputIsEmpty,dataChecker.EmailExist,userController.userCreate)
router.get("/",VerifyAccess("admin"), userController.getAllUser);
router.get("/:id", userController.getOneUser);
router.delete("/:id",userController.deleteOneUser)
router.patch("/:id",userController.updateUser)
router.delete("/",VerifyAccess("admin"),userController.deleteAll)
router.post("/login",userController.LOGIN)

 export default router