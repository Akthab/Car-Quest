"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseMessage {
    // AUTH
    static LOGIN_SUCCESS = 'Logged in successful';
    static INVALID_CREDENTIALS = 'Invalid Credentials';
    static NO_USER = 'User does not exist';
    static NO_PASSWORD = 'Please define a password';
    // USER
    static GET_USER_DETAILS_SUCCESS = 'Fetched User Details successful';
}
exports.default = ResponseMessage;
