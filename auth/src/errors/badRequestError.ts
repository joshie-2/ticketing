// Sub classing Error object
import { CustomError } from './customError';

export class BadRequestError extends CustomError {
	statusCode = 400;

	constructor(public message: string) {
		super(message);

		// have to do this because we are extending a built in class and using typescript
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializedErrors() {
		return [{ message: this.message }];
	}
}
