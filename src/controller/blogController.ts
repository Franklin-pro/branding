import { Request,Response } from "express";
import { Blogs } from "../model/blogs";
import { successMessage } from "../utils/successMessage";
import { errorMessage } from "../utils/errorMessage";

class blogsController{
    public static async postBlogs(req:Request,res:Response):Promise<void>{
        const{blogTitle,blogDescription,blogImage}=req.body

        try {
            const blogs = await Blogs.create({blogTitle,blogDescription,blogImage})
            if(blogs){
                return successMessage(res,200,`blogs posted successfully`,blogs)
            }else{
                return errorMessage(res,204,`no blog posted`)
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            return errorMessage(res, 500, `Internal server error`);
        }
    }

    public static async getAllBlogs(req:Request,res:Response):Promise<void>{
        try {
            const blogs = await Blogs.find()
            if(blogs){
                return successMessage(res,200,`all blogs retrived`,blogs)
            }else{
                return errorMessage(res,200,`no blogs retrived`)
            }
        } catch (error) {
            
        }
    }

    public static async getOneBlogs(req:Request,res:Response):Promise<void>{
        const blogId = req.params.id
        try {
            const blogs = await Blogs.findById(blogId)
            if(blogs){
                return successMessage(res,200,`blogs retrived`,blogs)
            }else{
                return errorMessage(res,200,`no blogs retrived`)
            }
        } catch (error) {
            
        }
    }
    public static async deleteOneBlogs(req:Request,res:Response):Promise<void>{
        const blogId = req.params.id
        try {
            const blogs = await Blogs.findByIdAndDelete(blogId)
            if(blogs){
                return successMessage(res,200,`blogs retrived`,blogs)
            }else{
                return errorMessage(res,200,`no blogs retrived`)
            }
        } catch (error) {
            
        }
    }
    public static async updateBlogs(req:Request,res:Response):Promise<void>{
        const blogId = req.params.id
        try {
            const blogs = await Blogs.findByIdAndUpdate(blogId,req.body,{new:true})
            if(blogs){
                return successMessage(res,200,`blogs updated successfully`,blogs)
            }else{
                return errorMessage(res,200,`no blogs updated`)
            }
        } catch (error) {
            
        }
    }
    public static async deleteAllBlogs(req:Request,res:Response):Promise<void>{
        const blogId = req.params.id
        try {
            const blogs = await Blogs.deleteMany()
            if(blogs){
                return successMessage(res,200,`all blogs deleted`,blogs)
            }else{
                return errorMessage(res,200,`no blogs deleted`)
            }
        } catch (error) {
            
        }
    }

    // public static async Like(req: Request, res: Response): Promise<void> {
    //     const idparams = req.params.id;
    //     let userId: string;
    //     try {
    //         if (idparams.length !== 24) {
    //             return errorMessage(res, 401, `Invalid id`);
    //         }
    
    //         const blog = await Blogs.findById(idparams);
    //         if (!blog) {
    //             return errorMessage(res, 404, `Blog not found`);
    //         }
    
    //         // Check if req.user is defined before accessing its properties
    //         if (req.user && typeof req.user.user === 'string') {
    //             userId = req.user.user;
    //         } else {
    //             userId = ''; 
    //         }
    
    //         if (blog.Likes.includes(userId)) {
    //             return errorMessage(res, 400, `You have already liked this blog`);
    //         } else {
    //             if (blog.DisLikes.includes(userId)) {
    //                 blog.DisLikes.pull(userId);
    //             }
    //             blog.Likes.push(userId);
    //             await blog.save();
    //             return successMessage(res, 200, `Liked by user: ${userId}`,blog);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         return errorMessage(res, 500, `Internal Server Error`);
    //     }
    // }
}

export { blogsController}