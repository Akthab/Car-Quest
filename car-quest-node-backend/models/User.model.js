import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: [true, 'Please provide a password'] },
	},
	{ collection: 'users' }
);

const UserModel = mongoose.model('User', UserSchema); // Use 'User' as the model name

export default UserModel;
