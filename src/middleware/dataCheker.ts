import {Request,Response, NextFunction } from "express";
import { USER } from "../model/user";
import { errorMessage } from "../utils/errorMessage";
import { error } from "console";


class dataChecker{
    public static async inputIsEmpty(req:Request, res:Response,next : NextFunction) :Promise<void> {
    const{firstName,lastName,email,passWord,confirmPassword}=req.body

    if(firstName ==""){
        return errorMessage(res,201,`firstName it empty please fill`)
    }else if(lastName == ""){
        return errorMessage(res,201,`lastName it empty please fill`)
    }else if(email == ""){
        return errorMessage(res,201,`email it empty please fill`)
    }
    else if(passWord == ""){
        return errorMessage(res,201,`password it empty please fill`)
    }
    else if(confirmPassword == ""){
        return errorMessage(res,201,`confirm password it empty please fill`)
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