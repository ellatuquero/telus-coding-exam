import { CustomError } from './CustomError';

// Error class but returns a 200 status code - Requested by Jensen (Mobile dev)
export class SuccessRequestError extends CustomError {
    statusCode = 200;

    constructor(message : string) {
        super(message);
        Object.setPrototypeOf(this, SuccessRequestError.prototype)
    }

    serializeErrors() {
        return ([{
            message : this.message
        }])
    }
}