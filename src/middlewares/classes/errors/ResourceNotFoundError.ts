import { CustomError } from './CustomError';

export class ResourceNotFoundError extends CustomError {

    statusCode = 404;

    constructor() {
        super('Resource not found')

        Object.setPrototypeOf(this, ResourceNotFoundError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return ([
            {
                message : 'Resource not found.'
            }
        ])
    }
}