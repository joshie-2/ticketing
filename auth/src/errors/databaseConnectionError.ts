import { CustomError } from './customError';

// Sub classing Error object
export class DatabaseConnectionError extends CustomError {
	reason = 'Error connecting to database';
	statusCode = 500;
	constructor() {
		super('invalid request parameters');

		// have to do this because we are extending a built in class and using typescript
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializedErrors() {
		return [{ message: this.reason }];
	}
}
