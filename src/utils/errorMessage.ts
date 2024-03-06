import express, { Response } from 'express'

const errorMessage = (res: Response, status: number, message: string): void => {
    res.status(status).json({
        error: {
            code: status,
            message: message
        }
    });
};

export { errorMessage };