import { Request,Response, NextFunction, } from "express";
import { validationResult, Result, check } from "express-validator";
import { errorMessage } from "../utils/errorMessage";
import { RequestHandler } from 'express';


class validator{
    public static async InputValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().map((error) => {
                errorMessage(res, 401, error.msg);
            });
        } else {
            next();
        }
    }

    public static userAccount(): RequestHandler[] {
        return [
            check("firstName", "Please provide a valid first name without numbers").trim().isAlpha(),
            check("lastName", "Please provide a valid last name without numbers").trim().isAlpha(),
            check("email", "Please provide a valid email address").trim().isEmail(),
            check("passWord", "Please provide a strong password starting with a capital letter, mixing numbers and symbols").isStrongPassword()
        ];
    }
   
}
export {validator}