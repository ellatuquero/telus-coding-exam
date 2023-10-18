import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from './classes/errors/RequestValidationError'

export const requestValidator = (
    req : Request,
    res : Response,
    next : NextFunction ) => {

    const errors = validationResult(req)

    if ( !errors.isEmpty() ) {
        throw new RequestValidationError(errors.array());
    }

    next()
    
}