// we are creating an abstract class to ensure we are able to guarantee that all custom
// errors have the correct types and shape.  Also, prevent our error handler from growing out
// of control in the future when additional custom errors are added.

export abstract class CustomError extends Error {
	abstract statusCode: number;

	constructor(message: string) {
		super(message);
		// have to do this because we are extending a built in class and using typescript
		Object.setPrototypeOf(this, CustomError.prototype);
	}
	abstract serializedErrors(): { message: string; field?: string }[];
}
