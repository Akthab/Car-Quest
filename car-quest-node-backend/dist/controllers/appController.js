"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailsByHeader = exports.addPost = exports.updateUser = exports.register = exports.login = void 0;
const User_model_js_1 = __importDefault(require("../models/User.model.js"));
const Post_model_js_1 = __importDefault(require("../models/Post.model.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lib_storage_1 = require("@aws-sdk/lib-storage");
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const model_1 = require("../model");
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
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
            profileImage: null,
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
  "firstName" : "Hello",
  "lastName": "World",
  "phoneNumber": "+94 71 234 5678"
}
*/
async function updateUser(req, res) {
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
        return res.json({ status: 'User Updated Success' });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' });
    }
}
exports.updateUser = updateUser;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const s3 = new client_s3_1.S3({
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
    const resizedBuffer = await (0, sharp_1.default)(fileBuffer)
        .resize({ height: 1920, width: 1080, fit: 'contain' })
        .toBuffer();
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: (0, uuid_1.v4)(),
        Body: resizedBuffer,
        ContentType: file.mimetype,
    };
    try {
        const data = await new lib_storage_1.Upload({
            client: s3,
            params: uploadParams,
        }).done();
        const uploadImageUrl = data['Location'];
        return uploadImageUrl;
    }
    catch (err) {
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
async function addPost(req, res) {
    try {
        const uploadMiddleware = upload.single('image');
        uploadMiddleware(req, res, async (err) => {
            const postImageUrl = await uploadImageNew(req.file);
            const post = await Post_model_js_1.default.create({
                postTitle: req.body.postTitle,
                postDescription: req.body.postDescription,
                postCarMake: req.body.postCarMake,
                postCarYear: req.body.postCarYear,
                postCarType: req.body.postCarType,
                postImageUrl: postImageUrl,
            });
        });
        res.json({ message: 'Post creation successful' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.addPost = addPost;
/** POST: http://localhost:8080/api/getUserDetailsByHeader
 * @param: {
 * jwtToken: eyzxcvbnbvcxvbnmbnmmnbvbnmnbvbnmnbv
}
*/
async function getUserDetailsByHeader(req, res) {
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
        const user = await User_model_js_1.default.findOne({ email: email });
        if (user != null) {
            const userDetailsResponse = new model_1.UserDetailsResponse(user.id, user.firstName, user.lastName, user.email, user.phoneNumber);
            res.json(userDetailsResponse);
        }
        else {
            return res.json({ status: 'No user found for the token' });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' });
    }
}
exports.getUserDetailsByHeader = getUserDetailsByHeader;
