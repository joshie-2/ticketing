import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;
// before all tests connect to mongo database before any test is ran
beforeAll(async () => {
	process.env.JWT_KEY = 'oeioinoisdno';
	mongo = await MongoMemoryServer.create();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri);
});

// before each test find all collections and delete them
beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

// after all tests are complete stop and disconnect database
afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});
