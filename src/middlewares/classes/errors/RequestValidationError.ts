import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
    statusCode = 400; // Changed to 200, requested by Jensen for Input Errors
    
    constructor(public errors : ValidationError[]) {
        super("Invalid request parameters");

        // Note: Due to extending built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return {
                message: err.msg,
                field: err.param
            }
        })
    }

}