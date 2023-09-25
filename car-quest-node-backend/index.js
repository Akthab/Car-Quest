const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/userModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const formidableMiddleware = require('express-formidable');
const multer = require('multer');
const { Upload } = require('@aws-sdk/lib-storage'),
	{ S3 } = require('@aws-sdk/client-s3');

app.use(cors());
app.use(express.json()); // To parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));
// app.use(formidableMiddleware({ multiples: true }));
mongoose.connect('mongodb://localhost:27017/TESTING_DB');

app.post('/api/register', async (req, res) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		});
		res.send({ status: 'ok' });
	} catch (err) {
		res.send({ status: 'error', error: 'Duplicate email' });
	}
});

app.post('/api/login', async (req, res) => {
	console.log('This is the request body ' + req.body.email);
	try {
		const user = await User.findOne({
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
					name: user.name,
					email: user.email,
				},
				'secret123'
			);

			return res.json({ status: 'ok', user: token });
		} else {
			return res.send({ status: 'error', error: 'Invalid credentials' });
		}
	} catch (error) {
		return res.json({ status: 'error', user: false });
	}
});

app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token'];

	try {
		const decoded = jwt.verify(token, 'secret123');
		const email = decoded.email;
		const user = await User.findOne({ email: email });

		return res.json({ status: 'ok', quote: user.quote });
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', error: 'invalid token' });
	}
});

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token'];

	try {
		const decoded = jwt.verify(token, 'secret123');
		const email = decoded.email;
		await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

		return res.json({ status: 'ok' });
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', error: 'invalid token' });
	}
});

const upload = multer({
	dest: 'files/', // Location where files will be saved
});

const s3 = new S3({
	accessKeyId: 'AKIA45AZE7WUGTGPQUL2',
	secretAccessKey: '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',
});

app.post('/api/upload', upload.any(), async function (req, res) {
	const file = req.files;

	console.log('The file is the', file[0].originalname);

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
		console.log('Upload Success', data.Location);
	} catch (err) {
		console.log('Error', err);
	}

	res.json({ message: 'Upload successful' });
});

app.use((error, req, res, next) => {
	console.error(error); // Log the error to the console
	res.status(500).json({ error: 'Internal Server Error' });
	console.log('IT IS THE ERROR');
});

app.listen(8080, () => {
	console.log('Server has started running on port 8080');
});
