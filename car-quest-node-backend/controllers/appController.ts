import UserModel from '../models/User.model.js';
import PostModel from '../models/Post.model.js';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Upload } from '@aws-sdk/lib-storage';
import multer from 'multer';
import { S3 } from '@aws-sdk/client-s3';
import { UserDetailsResponse } from '../model/userResponse';
import { PostDetailsResponse } from '../model/postResponse';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

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
		const user = new UserModel({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			password: newPassword, // Use the hashed password
		});

		await user.save();

		res.send({ status: 'User registered successfully' });
	} catch (err) {
		// Handle errors
		if (err.code === 11000 && err.keyPattern.email) {
			// Duplicate email error
			res.send({ status: 'error', error: 'Duplicate email' });
		} else if (err.code === 11000 && err.keyPattern.phoneNumber) {
			// Duplicate phone number error
			res.send({ status: 'error', error: 'Duplicate phone number' });
		} else {
			// Other errors
			console.error('Registration error:', err);
			res.send({ status: 'error', error: 'Internal Server Error' });
		}
	}
}

/** POST: http://localhost:8080/api/updateUser 
 * @param: {
  "firstName" : "Hello",
  "lastName": "World",
  "phoneNumber": "+94 71 234 5678"
}
*/
export async function updateUser(req, res) {
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

		return res.json({ status: 'User Updated Success' });
	} catch (error) {
		res.json({ status: 'error', error: 'invalid token' });
	}
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new S3({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

//function to upload image to AWS S3 bucket
async function uploadImageNew(imageFile) {
	const file = imageFile;
	const fileBuffer = Buffer.from(file.buffer);

	const resizedBuffer = await sharp(fileBuffer)
		.resize({ height: 1920, width: 1080, fit: 'contain' })
		.toBuffer();

	const uploadParams = {
		Bucket: process.env.AWS_S3_BUCKET,
		Key: uuidv4(),
		Body: fileBuffer,
		ContentType: file.mimetype,
	};

	try {
		const data = await new Upload({
			client: s3,
			params: uploadParams,
		}).done();

		const uploadImageUrl = data['Location'];

		return uploadImageUrl;
	} catch (err) {
		console.log('Error', err);
	}
}

/** POST: http://localhost:8080/api/addPost 
 * @param: {
  "postTitle" : "Misfiring in the engine",
  "postDescription": "The engine keeps misfiring when the rpm is above 2000rpm",
  "postCarMake": "Toyota",
  "postCarModel": "Camry",
  "postCarType": "Sedan",
  "postImageUrl": "https/xyzzz/aabcccc/ghjjjj"
}
*/

export async function addPost(req, res) {
	try {
		const uploadMiddleware = upload.single('image');

		uploadMiddleware(req, res, async (err) => {
			let postImageUrl = null;

			if (req.file) {
				postImageUrl = await uploadImageNew(req.file);
			}

			const post = await PostModel.create({
				postTitle: req.body.postTitle,
				postDescription: req.body.postDescription,
				postCarMake: req.body.postCarMake,
				postCarYear: req.body.postCarYear,
				postCarType: req.body.postCarType,
				postCarFuelType: req.body.postCarFuelType,
				postImageUrl: postImageUrl,
			});
		});

		res.json({ message: 'Post creation successful' });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
}

/** POST: http://localhost:8080/api/getUserDetailsByHeader 
 * @param: {
 * jwtToken: eyzxcvbnbvcxvbnmbnmmnbvbnmnbvbnmnbv
}
*/
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
		res.json({ status: 'error', error: 'invalid token' });
	}
}

export async function getAllPosts(req, res) {
	try {
		const allPosts = await PostModel.find({});

		if (allPosts != null) {
			// const postDetailsResponse = new PostDetailsResponse(
			// 	userPost.id,
			// 	userPost.postTitle,
			// 	userPost.postDescription,
			// 	userPost.postCarMake,
			// 	userPost.postCarYear,
			// 	userPost.postImageUrl,
			// 	userPost.postCarType,
			// 	userPost.postCarFuelType
			// );
			res.json(allPosts);
		} else {
			return res.json({ status: 'No posts found' });
		}
	} catch (error) {
		res.json({ status: 'error', error: 'invalid token' });
	}
}

export async function deletePost(req, res) {
	try {
		const postId = req.params.postId;

		const deleted = await PostModel.deleteOne({ _id: postId });

		if (deleted.deletedCount > 0) {
			return res.json({ status: 'Post deleted' });
		} else {
			return res.json({ status: 'No post found with the given ID' });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}

export async function likedStatus(req, res) {
	const postId = req.params.postId;
	const userId = req.query.userId;

	try {
		const post = await PostModel.findById(postId);

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		const liked = post.likedBy.includes(userId);

		res.json({ liked });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
