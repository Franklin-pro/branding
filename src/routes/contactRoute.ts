import express,{Router} from 'express';
import { contactController } from '../controller/product.contactController';
import VerifyAccess from '../middleware/verifyAccess';

const router:Router = express.Router()

router.post("/",contactController.postMessage)
router.get("/",contactController.getAllMessage)
router.get("/:id",contactController.getOneMessage)
router.delete("/",contactController.deleteOneMessage)
router.put("/:id",contactController.updateMessage)

export default router