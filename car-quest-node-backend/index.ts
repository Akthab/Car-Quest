import router from './router/route';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);

app.use('/api', router);

app.use((error, req, res, next) => {
	console.error(error); // Log the error to the console
	res.status(500).json({ error: 'Internal Server Error' });
	console.log('IT IS THE ERROR');
});

app.listen(8080, () => {
	console.log('Server has started running on port 8080');
});
