import express, { Request, Response } from "express";
import blogsRoutes from "./routes/blogsRoutes";
import userRoutes from './routes/userRoute'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import userController from "./controller/product.userController";
import { blogsController } from "./controller/product.blogController";
import { contactController } from "./controller/product.contactController";


const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Welcome to our first API"});
});

//users
app.post("/",userController.createUser)
app.post("/login",userController.LOGIN)
app.get("/",userController.getAllUsers)
app.get("/:id",userController.getUser)
app.delete("/:id",userController.deleteUser)
app.delete("/",userController.deleteAllUser)

//blogs

app.post("/",blogsController.postBlogs)
app.get("/:id", blogsController.getOneBlogs)
app.get("/", blogsController.getAllBlogs)
app.delete("/:id",blogsController.deleteOneBlogs)
app.delete("/",blogsController.deleteAllBlogs)
app.put("/:id",blogsController.updateBlogs)

//contact me

app.post("/",contactController.postMessage)
app.get("/:id", contactController.getOneMessage)
app.get("/", contactController.getAllMessage)
app.delete("/:id",contactController.deleteOneMessage)
app.delete("/",contactController.updateMessage)
// app.put("/:id",blogsController.updateBlogs)
export default app;