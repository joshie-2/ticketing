import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validateRequest';
import { User } from '../models/user';
import { BadRequestError } from '../errors/badRequestError';
const router = express.Router();

router.post(
	'/api/users/signup',
	[
		body('email')
			.trim()
			.isEmail()
			.normalizeEmail()
			.withMessage('Email must be valid'),
		body('password')
			.trim()
			.isStrongPassword({
				minLength: 8,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
				returnScore: false,
			})
			.withMessage(
				'Password must have minimum length of 8 and include 1 uppercase letter, 1 number and 1 symbol',
			),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// grab validated email and password
		const { email, password } = req.body;

		// check if email exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			console.log('Email in use');
			throw new BadRequestError('Email in use');
		}

		// create and save user to database
		const user = User.build({ email, password });
		const savedUser = await user.save();

		// generate jwt
		const accessToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_KEY!,
		);

		// store on session object
		// jwt is delivered within session as base64
		req.session = {
			jwt: accessToken,
		};

		// respond with successful and user data
		res.status(201).send(savedUser);
	},
);

export { router as signUpRouter };
