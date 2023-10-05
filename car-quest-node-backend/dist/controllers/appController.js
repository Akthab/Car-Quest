"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailsByHeader = exports.uploadImage = exports.updateUserNew = exports.register = exports.login = void 0;
const User_model_js_1 = __importDefault(require("../models/User.model.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lib_storage_1 = require("@aws-sdk/lib-storage");
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const model_1 = require("../model");
/** POST: http://localhost:8080/api/login
 * @param: {
  "email" : "hello@gmail.com",
  "password" : "name+1234"
}
*/
async function login(req, res) {
    try {
        const user = await User_model_js_1.default.findOne({
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
        const isPasswordValid = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({
                name: user.firstName,
                email: user.email,
            }, 'secret123');
            return res.json({ status: 'User Login Successfully', user: token });
        }
        else {
            return res.send({ status: 'error', error: 'Invalid credentials' });
        }
    }
    catch (error) {
        return res.json({ status: 'error', user: false });
    }
}
exports.login = login;
/** POST: http://localhost:8080/api/register
 * @param: {
  "firstName" : "Hello",
  "lastName": "World",
  "phoneNumber": "+94 71 234 5678"
  "email": "hello@gmail.com"
  "password" : "admin123"
}
*/
async function register(req, res) {
    try {
        const newPassword = await bcryptjs_1.default.hash(req.body.password, 10); // Hash the password
        const user = await User_model_js_1.default.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: newPassword, // Use the hashed password
        });
        res.send({ status: 'User registered successfully' });
    }
    catch (err) {
        console.error('This is the error', err);
        res.send({ status: 'error', error: 'Duplicate email' });
    }
}
exports.register = register;
/** POST: http://localhost:8080/api/updateUser
 * @param: {
  "name" : "example123",
}
*/
// export async function updateUser(req, res) {
// 	// Get the bearer token from the authorization header.
// 	const token = req.headers.authorization.split(' ')[1];
// 	try {
// 		// Verify the bearer token.
// 		const decoded = jwt.verify(token, 'secret123');
// 		// Get the user's email from the decoded token.
// 		const email = decoded.email;
// 		await UserModel.updateOne(
// 			{ email: email },
// 			{ $set: { name: req.body.name } }
// 		);
// 		// Return the user's quote.
// 		return res.json({ status: 'User Updated Success' });
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ status: 'error', error: 'invalid token' });
// 	}
// }
async function updateUserNew(req, res) {
    // Get the bearer token from the authorization header.
    const token = req.headers.authorization.split(' ')[1];
    try {
        // Verify the bearer token.
        const decoded = jsonwebtoken_1.default.verify(token, 'secret123');
        let email = undefined;
        if (typeof decoded === 'object') {
            // Get the user's email from the JwtPayload object.
            email = decoded.email;
        }
        else {
            // The decoded token is a string, so the email property does not exist.
            email = undefined;
        }
        await User_model_js_1.default.updateOne({ email }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
            },
        });
        // Return the user's quote.
        return res.json({ status: 'User Updated Success' });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' });
    }
}
exports.updateUserNew = updateUserNew;
const upload = (0, multer_1.default)({
    dest: 'files/', // Location where files will be saved
});
const s3 = new client_s3_1.S3({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIA45AZE7WUGTGPQUL2',
        secretAccessKey: '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',
    },
});
async function uploadImage(req, res) {
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
            const data = await new lib_storage_1.Upload({
                client: s3,
                params: uploadParams,
            }).done();
            // console.log('Upload Success', data.Location);
        }
        catch (err) {
            console.log('Error', err);
        }
        res.json({ message: 'Upload successful' });
    });
}
exports.uploadImage = uploadImage;
async function getUserDetailsByHeader(req, res) {
    console.log('HEADER...................', req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    try {
        // Verify the bearer token.
        const decoded = jsonwebtoken_1.default.verify(token, 'secret123');
        let email = undefined;
        console.log('THE DECODED', decoded);
        if (typeof decoded === 'object') {
            // Get the user's email from the JwtPayload object.
            email = decoded.email;
        }
        else {
            // The decoded token is a string, so the email property does not exist.
            email = undefined;
        }
        console.log('The email', email);
        const user = await User_model_js_1.default.findOne({ email: email });
        console.log('THE USER', user);
        if (user != null) {
            console.log('The user not null');
            // Check to make sure that the UserDetailsResponse constructor is being called correctly.
            const userDetailsResponse = new model_1.UserDetailsResponse(user.id, user.firstName, user.lastName, user.email, user.phoneNumber);
            console.log('The UserDetailsResponse object', userDetailsResponse);
            res.json(userDetailsResponse);
            // return new UserDetailsResponse(
            // 	user.id,
            // 	user.firstName,
            // 	user.lastName,
            // 	user.email,
            // 	user.phoneNumber
            // );
            // return res.json(
            // 	user.id,
            // 	user.firstName,
            // 	user.lastName,
            // 	user.email,
            // 	user.phoneNumber
            // );
            // console.log('User Response Model', userResponseModel);
            // return userResponseModel;
        }
        else {
            return res.json({ status: 'No user found for the token' });
        }
        // Return the user's quote.
        // return res.json({ status: 'User Updated Success', user });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' });
    }
}
exports.getUserDetailsByHeader = getUserDetailsByHeader;
