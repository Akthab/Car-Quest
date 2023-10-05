import UserModel from '../models/User.model.js';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Upload } from '@aws-sdk/lib-storage';
import multer from 'multer';
import { S3 } from '@aws-sdk/client-s3';
import { UserDetailsResponse } from '../model';

/** POST: http://localhost:8080/api/login 
 * @param: {
  "email" : "hello@gmail.com",
  "password" : "name+1234"
}
*/
export async function login(req, res) {
	try {
		const user = await UserModel.findOne({
			email: req.body.email,
		});

		if (!user) {
			console.log('No matching user');
			return res.send({
				status: 'error',
				error: 'Invalid user does not exist',
			});
		}

		if (typeof req.body.password === 'undefined' || req.body.password === '') {
			// Password is empty or undefined
			return res.send({ status: 'error', error: 'No password' });
		}

		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (isPasswordValid) {
			const token = jwt.sign(
				{
					name: user.firstName,
					email: user.email,
				},
				'secret123'
			);

			return res.json({ status: 'User Login Successfully', user: token });
		} else {
			return res.send({ status: 'error', error: 'Invalid credentials' });
		}
	} catch (error) {
		return res.json({ status: 'error', user: false });
	}
}

/** POST: http://localhost:8080/api/register 
 * @param: {
  "firstName" : "Hello",
  "lastName": "World",
  "phoneNumber": "+94 71 234 5678"
  "email": "hello@gmail.com"
  "password" : "admin123"
}
*/
export async function register(req, res) {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
		const user = await UserModel.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			password: newPassword, // Use the hashed password
		});
		res.send({ status: 'User registered successfully' });
	} catch (err) {
		console.error('This is the error', err);
		res.send({ status: 'error', error: 'Duplicate email' });
	}
}

export async function updateUserNew(req, res) {
	// Get the bearer token from the authorization header.
	const token = req.headers.authorization.split(' ')[1];

	try {
		// Verify the bearer token.
		const decoded = jwt.verify(token, 'secret123');

		let email: string | undefined = undefined;

		if (typeof decoded === 'object') {
			// Get the user's email from the JwtPayload object.
			email = decoded.email;
		} else {
			// The decoded token is a string, so the email property does not exist.
			email = undefined;
		}

		await UserModel.updateOne(
			{ email },
			{
				$set: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					phoneNumber: req.body.phoneNumber,
				},
			}
		);

		// Return the user's quote.
		return res.json({ status: 'User Updated Success' });
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', error: 'invalid token' });
	}
}

const upload = multer({
	dest: 'files/', // Location where files will be saved
});

const s3 = new S3({
	region: 'ap-south-1',
	credentials: {
		accessKeyId: 'AKIA45AZE7WUGTGPQUL2',
		secretAccessKey: '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',
	},
});

export async function uploadImage(req, res) {
	const uploadMiddleware = upload.any();
	uploadMiddleware(req, res, async (err) => {
		if (err) {
			console.error(err);
			return;
		}

		const file = req.files;
		const uploadParams = {
			Bucket: 'thefirstbucketyo',
			Key: file[0].originalname,
			Body: Buffer.from(file[0].path),
		};

		try {
			const data = await new Upload({
				client: s3,
				params: uploadParams,
			}).done();
			// console.log('Upload Success', data.Location);
		} catch (err) {
			console.log('Error', err);
		}

		res.json({ message: 'Upload successful' });
	});
}

export async function getUserDetailsByHeader(req, res: Response) {
	const token = req.headers.authorization.split(' ')[1];

	try {
		// Verify the bearer token.
		const decoded = jwt.verify(token, 'secret123');

		let email: string | undefined = undefined;

		if (typeof decoded === 'object') {
			// Get the user's email from the JwtPayload object.
			email = decoded.email;
		} else {
			// The decoded token is a string, so the email property does not exist.
			email = undefined;
		}

		const user = await UserModel.findOne({ email: email });

		if (user != null) {
			const userDetailsResponse = new UserDetailsResponse(
				user.id,
				user.firstName,
				user.lastName,
				user.email,
				user.phoneNumber
			);

			res.json(userDetailsResponse);
		} else {
			return res.json({ status: 'No user found for the token' });
		}
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', error: 'invalid token' });
	}
}
