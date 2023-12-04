"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
    password: { type: String, required: [true, 'Please provide a password'] },
}, { collection: 'users' });
const UserModel = mongoose_1.default.model('User', UserSchema); // Use 'User' as the model name
exports.default = UserModel;
