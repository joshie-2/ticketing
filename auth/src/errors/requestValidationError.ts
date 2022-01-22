// Sub classing Error object
import { ValidationError } from 'express-validator';
import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
	statusCode = 400;

	constructor(public errors: ValidationError[]) {
		super('Error connecting to Database');

		// have to do this because we are extending a built in class and using typescript
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializedErrors() {
		return this.errors.map((error) => {
			return { message: error.msg, field: error.param };
		});
	}
}
