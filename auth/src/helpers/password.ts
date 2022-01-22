import * as argon2 from 'argon2';

export class Password {
	static async toHash(password: string) {
		let hash: string;
		try {
			return (hash = await argon2.hash(password));
		} catch (error) {
			console.log(error);
		}
	}

	static async compare(storedPassword: string, suppliedPassword: string) {
		try {
			return await argon2.verify(storedPassword, suppliedPassword);
		} catch (error) {
			console.log(error);
		}
	}
}
