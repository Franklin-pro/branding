import Jwt, { JsonWebTokenError, TokenExpiredError, } from "jsonwebtoken";
import { errorMessage } from "../utils/errorMessage";
import { NextFunction, Request, Response } from 'express';
// import { isAnyArrayBuffer } from "util/types";

// Define the structure of your user payload
interface UserPayload {
    user: {
        Role: string;
    };
    admin: {
        Role: string;
    };
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserPayload;
    }
  
}

const VerifyAccess = (passrole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["andela"];

        if (!token || Array.isArray(token)) {
            return errorMessage(res, 401, `No valid token provided`);
        }

        const secretKey = process.env.SECRET_KEY;

        if (!secretKey) {
            return errorMessage(res, 500, `Secret key is not defined`);
        }

        try {
            const verifyToken = Jwt.verify(token, secretKey) as UserPayload;
            req.user = verifyToken;

            if (passrole === verifyToken.user.Role) {
                return errorMessage(res, 201, `You don't have access`);
            } else {
                next();
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return errorMessage(res, 401, `Token expired`);
            } else if (error instanceof JsonWebTokenError) {
                return errorMessage(res, 401, `Invalid token`);
            }
            return errorMessage(res, 500, `Server Error`);
        }
    };
};

export default VerifyAccess;