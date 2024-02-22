import express, { Response } from 'express'

const loginMessage = (res: Response, status: number, message: string,token:any): void => {
    res.status(status).json({
        message: message,
        token:token
     
    
    });
}

export { loginMessage }