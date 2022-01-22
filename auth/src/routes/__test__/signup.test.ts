import request from 'supertest';
import { app } from '../../app';

it('Successful Signup: returns 201', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'Password1!' })
		.expect(201);
});

it('Invalid Email: returns 400', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test', password: 'Password1!' })
		.expect(400);
});

it('Invalid Password: returns 400', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'Passwo' })
		.expect(400);
});

it('Missing Email & Password: returns 400', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({ email: '', password: '' })
		.expect(400);

	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com' })
		.expect(400);

	await request(app)
		.post('/api/users/signup')
		.send({ password: 'Password1!' })
		.expect(400);
});

it('Duplicate Email: disallow the second attempt of using same email', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test1@test.com', password: 'Password1!' })
		.expect(201);

	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test1@test.com', password: 'Password1!' })
		.expect(400);
});

it('Set Cookie: after successful signup the response has a cookie in the response header', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({ email: 'test1@test.com', password: 'Password1!' })
		.expect(201);
	expect(response.get('Set-Cookie')).toBeDefined();
});
