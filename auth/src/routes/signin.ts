import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Password } from '../helpers/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validateRequest';
import { BadRequestError } from '../errors/badRequestError';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email')
			.trim()
			.isEmail()
			.normalizeEmail()
			.withMessage('Email must be valid'),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('You must supply a valid password'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// grab validated email and password
		const { email, password } = req.body;

		// check if email exists
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new BadRequestError(
				'Creds do not work for us.  Check yourself :-) ',
			);
		}

		// compare passwords
		const passwordsMatch = await Password.compare(
			existingUser.password,
			password,
		);
		if (!passwordsMatch) {
			throw new BadRequestError(
				'Creds do not work for us.  Check yourself :-) ',
			);
		}

		// generate jwt
		const accessToken = jwt.sign(
			{ id: existingUser._id, email: existingUser.email },
			process.env.JWT_KEY!,
		);

		// store on session object
		// jwt is delivered within session as base64
		req.session = {
			jwt: accessToken,
		};

		// respond with successful and user data
		res.status(200).send(existingUser);
	},
);

export { router as signInRouter };
