import Jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { errorMessage } from "../utils/errorMessage";
import express, { Request, Response, NextFunction } from "express";

interface UserPayload {
  userId: string,
  email:string,
  role:string
}

declare module 'express' {
    interface Request {
        user?: UserPayload;
    }
}

const verifyAccess = (requiredRole: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["andela"];

        if (!token || typeof token !== "string") {
            return errorMessage(res, 401, "No valid token provided");
        }

        const secretKey = process.env.SECRET_KEY as string;

        try {
            
            const decodedToken = Jwt.verify(token, secretKey) as UserPayload;
            console.log(decodedToken)
            req.user = decodedToken;

            if (requiredRole !== decodedToken?.role) {
                return errorMessage(res, 403, "Insufficient permissions");
            }

            next();
        } catch (error: any) {
            if (error instanceof TokenExpiredError) {
                return errorMessage(res, 401, "Token expired");
            } else if (error instanceof JsonWebTokenError) {
                return errorMessage(res, 401, "Invalid token");
            } else {
                return errorMessage(res, 500, `Server Error: ${(error as Error).message}`);
            }
        }
    };
};

export default verifyAccess;
