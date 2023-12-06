"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requireAuth_js_1 = __importDefault(require("../middleware/requireAuth.js"));
const router = (0, express_1.Router)();
const controller = __importStar(require("../controllers/appController"));
// router.use(requireAuth);
router.route('/login').post(controller.login); // login user
router.route('/register').post(controller.register); // register user
router.route('/updateUser').post(controller.updateUser); // update user
router
    .route('/getUserDetailsByHeader')
    .post(requireAuth_js_1.default, controller.getUserDetailsByHeader); // get user details by header
router.route('/addPost').post(requireAuth_js_1.default, controller.addPost); // add post
router.route('/getAllPosts').get(controller.getAllPosts); //get all posts
router.route('/deletePost/:postId').delete(requireAuth_js_1.default, controller.deletePost); // delete post
router.route('/likedStatus/:postId').get(controller.likedStatus); // get liked status
exports.default = router;
