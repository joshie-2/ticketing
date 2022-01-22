import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
// helps express understand and trust that traffic is coming from an ingress
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		// allows testing to inspect cookies when not using Https
		secure: process.env.NODE_ENV !== 'test',
	}),
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
