"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./router/route"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const Post_model_js_1 = __importDefault(require("./models/Post.model.js"));
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // To parse JSON-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect(process.env.MONGODB_URL);
app.use('/api', route_1.default);
app.use((error, req, res, next) => {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Internal Server Error' });
});
// Update the 'like' event handling on the server
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('like', async ({ postId, userId }) => {
        console.log('In the like event');
        try {
            const post = await Post_model_js_1.default.findById(postId);
            // Check if the user has already liked the post
            if (!post.likedBy.includes(userId)) {
                // If not, increment the likes and add user to likedBy array
                post.postLikes += 1;
                post.likedBy.push(userId);
                await post.save();
                // Broadcast the updated post to all clients
                io.emit('like', {
                    post,
                    likedPostId: postId,
                    likedUserId: userId,
                    liked: true,
                });
            }
            else {
                // If the user has already liked the post, send liked status as false
                io.emit('like', {
                    likedPostId: postId,
                    likedUserId: userId,
                    liked: false,
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(8080, () => {
    console.log('Server has started running on port 8080');
});
