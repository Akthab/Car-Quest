import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import ResponseService from '../services/response.service.js';
import { ResponseMessage, ResponseCode } from '../constants/response';

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send(
				ResponseService.respond(
					ResponseCode.AUTH_ERROR,
					ResponseMessage.AUTH_TOKEN_REQUIRED
				)
			);
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
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send(
				ResponseService.respond(
					ResponseCode.AUTH_ERROR,
					ResponseMessage.REQ_NOT_AUTHENTICATED
				)
			);
	}
};

export default requireAuth;
