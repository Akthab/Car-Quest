import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phoneNumber: { type: String, required: true, unique: true },
		profileImage: { type: String, required: false, unique: true },
		password: { type: String, required: [true, 'Please provide a password'] },
	},
	{ collection: 'users' }
);

const UserModel = mongoose.model('User', UserSchema); // Use 'User' as the model name

export default UserModel;
