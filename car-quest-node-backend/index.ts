import router from './router/route';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import PostModel from './models/Post.model.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

app.use(cors());
app.use(express.json()); // To parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);

app.use('/api', router);

app.get('/hello', (req, res) => {
	res.send('Hello World');
});

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
			const post = await PostModel.findById(postId);

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
			} else {
				// If the user has already liked the post, send liked status as false
				io.emit('like', {
					likedPostId: postId,
					likedUserId: userId,
					liked: false,
				});
			}
		} catch (error) {
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
