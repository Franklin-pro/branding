import express, {Request,Response, NextFunction } from "express";
import { USER } from "../model/product.user";
import { errorMessage } from "../utils/errorMessage";



class dataChecker{
    public static async inputIsEmpty(req:Request, res:Response,next : NextFunction) :Promise<void> {
    const {username,email,password,confirmPassword} = req.body

    if(username ==""){
        return errorMessage(res,201,`firstName is empty please fill`)
    }
    else if(email == ""){
        return errorMessage(res,201,`email is empty please fill`)
    }
    else if(password == ""){
        return errorMessage(res,201,`password is empty please fill`)
    }
    else if(confirmPassword == ""){
        return errorMessage(res,201,`confirm password is empty please fill`)
    }
    else{
        next()
    }
    }
    public static async EmailExist(req:Request,res:Response,next:NextFunction):Promise<void>{
        const {email}=req.body
        const user = await USER.findOne({email})
        if(user){
            return errorMessage(res,200,`email exist`)
        }else {
            next()
        }
    }
}
export { dataChecker }