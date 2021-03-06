import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY not defined');
	}
	try {
		await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
		console.log(`Connected to authentication database`);
	} catch (error) {
		console.log(error);
	}
	app.listen(3000, () => {
		console.log(`Listening on port 3000!`);
	});
};

start();
