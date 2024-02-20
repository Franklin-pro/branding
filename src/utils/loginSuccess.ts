import express, { Response } from 'express'

const loginMessage = (res: Response, status: number, message: string,data:any,token:any): void => {
    res.status(status).json({
        message: message,
        token:token,
        data:data
    
    });
}

export { loginMessage }