import { CustomError } from './customError';

export class NotAuthorizedError extends CustomError {
	statusCode = 401;
	constructor() {
		super('Not Authorized');

		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}
	serializedErrors(): { message: string; field?: string | undefined }[] {
		return [{ message: 'Not Authorized' }];
	}
}
