"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./router/route"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // To parse JSON-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect(process.env.MONGODB_URL);
app.use('/api', route_1.default);
app.use((error, req, res, next) => {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Internal Server Error' });
    console.log('IT IS THE ERROR');
});
app.listen(8080, () => {
    console.log('Server has started running on port 8080');
});
// S3_BUCKET = 'thefirstbucketyo';
// AWS_ACCESS_KEY_ID = 'AKIA45AZE7WUGTGPQUL2';
// AWS_SECRET_ACCESS_KEY = 'mjLHncR9BjEeJdp1AZxpWQNqTumRON8';
// AWS_REGION = 'ap-south-1';
