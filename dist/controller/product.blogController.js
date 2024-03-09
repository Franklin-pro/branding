"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsController = void 0;
const product_blogs_1 = require("../model/product.blogs");
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
class blogsController {
    static async postBlogs(req, res) {
        const { blogTitle, blogDescription, blogImage } = req.body;
        try {
            const blogs = await product_blogs_1.Blogs.create({ blogTitle, blogDescription, blogImage });
            if (blogs) {
                return (0, successMessage_1.successMessage)(res, 200, `blogs posted successfully`, blogs);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 404, `no blog posted`);
            }
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return (0, errorMessage_1.errorMessage)(res, 500, `Internal server error`);
        }
    }
    static async getAllBlogs(req, res) {
        try {
            const blogs = await product_blogs_1.Blogs.find();
            if (blogs) {
                return (0, successMessage_1.successMessage)(res, 200, `all blogs retrived`, blogs);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 200, `no blogs retrived`);
            }
        }
        catch (error) {
        }
    }
    static async getOneBlogs(req, res) {
        const blogId = req.params.id;
        try {
            const blogs = await product_blogs_1.Blogs.findById(blogId);
            if (blogs) {
                return (0, successMessage_1.successMessage)(res, 200, `blogs retrived`, blogs);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 200, `no blogs retrived`);
            }
        }
        catch (error) {
        }
    }
    static async deleteOneBlogs(req, res) {
        const blogId = req.params.id;
        try {
            const blogs = await product_blogs_1.Blogs.findByIdAndDelete(blogId);
            if (blogs) {
                return (0, successMessage_1.successMessage)(res, 200, `blogs retrived`, blogs);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 200, `no blogs retrived`);
            }
        }
        catch (error) {
        }
    }
    static async updateBlogs(req, res) {
        const blogId = req.params.id;
        try {
            const blogs = await product_blogs_1.Blogs.findByIdAndUpdate(blogId, req.body, { new: true });
            if (blogs) {
                return (0, successMessage_1.successMessage)(res, 200, `blogs updated successfully`, blogs);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 200, `no blogs updated`);
            }
        }
        catch (error) {
        }
    }
    static async deleteAllBlogs(req, res) {
        const blogId = req.params.id;
        try {
            const blogs = await product_blogs_1.Blogs.deleteMany();
            if (blogs) {
                return (0, successMessage_1.successMessage)(res, 200, `all blogs deleted`, blogs);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 200, `no blogs deleted`);
            }
        }
        catch (error) {
        }
    }
    static async likeBlog(req, res) {
        try {
            const blog = await product_blogs_1.Blogs.findById(req?.params?.id);
            if (!blog) {
                return (0, errorMessage_1.errorMessage)(res, 201, `blogs not found`);
            }
            blog.Likes++;
            await blog.save();
            return (0, successMessage_1.successMessage)(res, 200, `blogs liked`, blog);
        }
        catch (error) {
            console.log('error from liked');
        }
    }
    static async unlikeBlog(req, res) {
        try {
            const blog = await product_blogs_1.Blogs.findById(req?.params?.id);
            if (!blog) {
                return (0, errorMessage_1.errorMessage)(res, 201, `blogs not liked`);
            }
            else {
                blog.Likes = (blog.Likes || 0) - 1;
            }
            if (blog.Likes < 0) {
                blog.Likes = 0;
            }
            await blog.save();
            return (0, successMessage_1.successMessage)(res, 200, `blogs unliked successfully`, blog);
        }
        catch (error) {
            console.log('error from likes', error);
        }
    }
}
exports.blogsController = blogsController;
//# sourceMappingURL=product.blogController.js.map