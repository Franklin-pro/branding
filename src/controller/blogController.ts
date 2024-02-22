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
    public static async likeBlog(req: Request, res: Response): Promise<void> {
        try {
            const blog = await Blogs.findById(req?.params?.id);
    
            if (!blog) {
               return errorMessage(res,201,`blogs not found`)
            }
            blog.Likes++;
            await blog.save();
    
          return successMessage(res,200,`blogs liked`,blog)
    
        } catch (error) {
            console.log('error from liked')
        }
    }
    
    public static async unlikeBlog(req: Request, res: Response): Promise<void> {
        try {
            const blog = await Blogs.findById(req?.params?.id);
            if (!blog) {
                return errorMessage(res, 201, `blogs not liked`);
            } else {
                
                blog.Likes = (blog.Likes || 0) - 1;
            }
            if (blog.Likes < 0) {
                blog.Likes = 0;
            }
            await blog.save();
            return successMessage(res, 200, `blogs unliked successfully`, blog);
        } catch (error) {
            console.log('error from likes', error);
        }
    }
    
    
}

export { blogsController}