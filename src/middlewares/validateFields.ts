import {NextFunction, Request, Response} from "express";
import {validationResult} from 'express-validator'

/**
 * Function to validate fields on the request body through the applied middleware's
 */
export const validateFields = (req:Request, res:Response, next:NextFunction) => {
    // Atrapa los errores de validacion
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next();
}
