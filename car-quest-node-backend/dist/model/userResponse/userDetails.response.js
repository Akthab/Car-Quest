"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDetailsResponse {
    id;
    firstName;
    lastName;
    email;
    phoneNumber;
    constructor(id, firstName, lastName, email, phoneNumber) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
exports.default = UserDetailsResponse;
