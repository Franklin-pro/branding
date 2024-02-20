import express,{Router} from 'express';
import { contactController } from '../controller/contactController';

const router:Router = express.Router()

router.post("/",contactController.postMessage)
router.get("/",contactController.getAllMessage)
router.get("/:id",contactController.getOneMessage)
router.delete("/:id",contactController.deleteOneMessage)
router.put("/:id",contactController.updateMessage)

export default router