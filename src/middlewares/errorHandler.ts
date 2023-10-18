import { Request, Response, NextFunction } from 'express'
import { CustomError } from './classes/errors/CustomError'

export const errorHandler = (err : Error,
    req : Request,
    res : Response,
    next : NextFunction) => {

        if ( err instanceof CustomError ) {
            return res.status(err.statusCode).send({
                success : false,
                errors : err.serializeErrors()
            })
        }
        
        console.error('Express Error Handler Catch (common package - errorHandler.ts):', err)

        res.status(400).send({  
            success : false,
            errors : [
                {
                    message : 'Something went wrong [Uncaught generic error]: ' + err.message
                }
            ]
        })

}