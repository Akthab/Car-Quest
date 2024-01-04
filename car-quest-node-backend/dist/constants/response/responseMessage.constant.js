"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseMessage {
    // AUTH
    static LOGIN_SUCCESS = 'Logged in successful';
    static INVALID_CREDENTIALS = 'Invalid Credentials';
    static NO_USER = 'User does not exist';
    static NO_PASSWORD = 'Please define a password';
    static AUTH_TOKEN_REQUIRED = 'Authorization token required';
    static REQ_NOT_AUTHENTICATED = 'Request is not authenticated';
    // USER
    static GET_USER_DETAILS_SUCCESS = 'Fetched User Details successful';
    //SERVER
    static INTERNAL_SERVER_ERROR = 'Internal Server Error';
}
exports.default = ResponseMessage;
