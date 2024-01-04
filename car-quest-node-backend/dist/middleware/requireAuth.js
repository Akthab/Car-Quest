"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const User_model_js_1 = __importDefault(require("../models/User.model.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_service_js_1 = __importDefault(require("../services/response.service.js"));
const response_1 = require("../constants/response");
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .send(response_service_js_1.default.respond(response_1.ResponseCode.AUTH_ERROR, response_1.ResponseMessage.AUTH_TOKEN_REQUIRED));
    }
    const token = authorization.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        let email = undefined;
        if (typeof decoded === 'object') {
            // Get the user's email from the JwtPayload object.
            email = decoded.email;
        }
        else {
            // The decoded token is a string, so the email property does not exist.
            email = undefined;
        }
        req.user = await User_model_js_1.default.findOne({ email: email });
        next();
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .send(response_service_js_1.default.respond(response_1.ResponseCode.AUTH_ERROR, response_1.ResponseMessage.REQ_NOT_AUTHENTICATED));
    }
};
exports.default = requireAuth;
