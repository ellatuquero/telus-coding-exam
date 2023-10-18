import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Database connection problem occured.'
    constructor() {
        super('Database failed to connect.');

        // Note: Due to extending built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [{
            message : this.reason
        }]
    }
}