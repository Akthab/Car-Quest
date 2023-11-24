"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostDetailsResponse {
    id;
    postTitle;
    postDescription;
    postCarMake;
    postCarYear;
    postImageUrl;
    postCarType;
    postCarFuelType;
    constructor(id, postTitle, postDescription, postCarMake, postCarYear, postImageUrl, postCarType, postCarFuelType) {
        this.id = id;
        this.postTitle = postTitle;
        this.postDescription = postDescription;
        this.postCarMake = postCarMake;
        this.postCarYear = postCarYear;
        this.postImageUrl = postImageUrl;
        this.postCarType = postCarType;
        this.postCarFuelType = postCarFuelType;
    }
}
exports.default = PostDetailsResponse;
