import express, { Router } from 'express';
import { userController } from '../controller/userController'; 
import { dataChecker } from '../middleware/dataCheker';
import { validator } from '../middleware/validator';
import VerifyAccess from '../middleware/verifyAccess';

const router:Router = express.Router();


router.post("/",dataChecker.inputIsEmpty,dataChecker.EmailExist,validator.userAccount(),validator.InputValidator, userController.userCreate);
router.get("/",VerifyAccess("admin"), userController.getAllUser);
router.get("/:id", userController.getOneUser);
router.delete("/:id",userController.deleteOneUser)
router.patch("/:id",userController.updateUser)
router.delete("/",VerifyAccess("admin"),userController.deleteAll)
router.post("/login",userController.LOGIN)


export default router;

