import express, { Request,Response } from "express";
import { Contact } from "../model/contact";
import { successMessage } from "../utils/successMessage";
import { errorMessage } from "../utils/errorMessage";




class contactController{
    public static async postMessage(req:Request,res:Response):Promise<void>{
        const{fullName,phone,email,message}=req.body

        try {
            const messages = await Contact.create({fullName,phone,email,message})
            if(messages){
                return successMessage(res,200,`message sent successfully`,messages)
            }else{
                return errorMessage(res,204,`no blog posted`)
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            return errorMessage(res, 500, `Internal server error`);
        }
    }

    public static async getAllMessage(req:Request,res:Response):Promise<void>{
        try {
            const message = await Contact.find()
            if(message){
                return successMessage(res,200,`all message retrived`,message)
            }else{
                return errorMessage(res,200,`no blogs retrived`)
            }
        } catch (error) {
            
        }
    }

    public static async getOneMessage(req:Request,res:Response):Promise<void>{
        const messageId = req.params.id
        try {
            const message = await Contact.findById(messageId)
            if(message){
                return successMessage(res,200,`message retrived`,message)
            }else{
                return errorMessage(res,200,`no message retrived`)
            }
        } catch (error) {
            
        }
    }
    public static async deleteOneMessage(req:Request,res:Response):Promise<void>{
        const messageId = req.params.id
        try {
            const message = await Contact.findByIdAndDelete(messageId)
            if(message){
                return errorMessage(res,200,`message deleted`)
            }else{
                return errorMessage(res,400,`no message retrived`)
            }
        } catch (error) {
            
        }
    }
    public static async updateMessage(req:Request,res:Response):Promise<void>{
        const messageId = req.params.id
        try {
            const message = await Contact.findByIdAndUpdate(messageId,req.body,{new:true})
            if(message){
                return successMessage(res,200,`message updated successfully`,message)
            }else{
                return errorMessage(res,400,`no message updated`)
            }
        } catch (error) {
            
        }
    }
  
}

export { contactController}