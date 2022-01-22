import mongoose from 'mongoose';
import { Password } from '../helpers/password';

// An interface that describes the properties required to create a new user
interface UserAttributes {
	email: string;
	password: string;
}

// An interface that describes the properties required for a User Model
interface UserModel extends mongoose.Model<any> {
	build(attrs: UserAttributes): UserDocument;
}

// An interface that describes the properties that a user document has
interface UserDocument extends mongoose.Document {
	email: string;
	password: string;
	// if you add additional properties created by mongo you need to include them here
	//createdAt:
	//updatedAt:
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		},
	},
);
// middleware to look if password is being modified and hashing prior to save
userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashedPassword = await Password.toHash(this.get('password'));
		this.set('password', hashedPassword);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttributes) => {
	return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

// User.build({
// 	email: 'test',
// 	password: '1234',
// });

export { User };
