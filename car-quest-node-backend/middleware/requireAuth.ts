import UserModel from '../models/User.model.js';
import jwt from 'jsonwebtoken';

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: 'Authorization token required' });
	}

	const token = authorization.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		let email: string | undefined = undefined;

		if (typeof decoded === 'object') {
			// Get the user's email from the JwtPayload object.
			email = decoded.email;
		} else {
			// The decoded token is a string, so the email property does not exist.
			email = undefined;
		}

		req.user = await UserModel.findOne({ email: email });
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: 'Request is not authenticated' });
	}
};

export default requireAuth;
