"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    postTitle: { type: String, required: true },
    postDescription: { type: String, required: true },
    postCarMake: { type: String, required: true },
    postCarYear: { type: String, required: true },
    postImageUrl: { type: String, required: false },
    postCarType: { type: String, required: false },
    postCarFuelType: { type: String, required: false },
    postLikes: { type: Number, default: 0 },
    likedBy: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'UserModel',
        },
    ],
}, { collection: 'posts' });
const PostModel = mongoose_1.default.model('Post', PostSchema); // Use 'User' as the model name
exports.default = PostModel;
