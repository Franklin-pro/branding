import express, {Request,Response, NextFunction } from "express";
import { validationResult, Result, check } from "express-validator";
import { errorMessage } from "../utils/errorMessage";
import { RequestHandler } from 'express';


class validator{
    public static async InputValidator(req: Request, res: Response, next: NextFunction){
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return errors.array().map((error) => {
                errorMessage(res, 401, error.msg);
            });
        } else {
            next();
        }
    }

    public static userAccount(): RequestHandler[] {
        return [
            check("email", "Please provide a valid email address").trim().isEmail(),
            check("password", "Please provide a strong password starting with a capital letter, mixing numbers and symbols").isStrongPassword()
        ];
    }
   
}
export {validator}