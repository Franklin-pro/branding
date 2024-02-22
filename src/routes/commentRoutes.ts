import express,{Router} from 'express'
import commentController from '../controller/commentController'

const router:Router = express.Router() 

router.post("/",commentController.addComment)
router.get("/",commentController.Comments)
export default router