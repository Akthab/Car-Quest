import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
const router = Router();

import * as controller from '../controllers/appController';

// router.use(requireAuth);
router.route('/login').post(controller.login); // login user
router.route('/register').post(controller.register); // register user
router.route('/updateUser').post(requireAuth, controller.updateUser); // update user
router
	.route('/getUserDetailsByHeader')
	.post(requireAuth, controller.getUserDetailsByHeader); // get user details by header
router.route('/addPost').post(requireAuth, controller.addPost); // add post
router.route('/getAllPosts').get(controller.getAllPosts); //get all posts
router.route('/deletePost/:postId').delete(requireAuth, controller.deletePost); // delete post
router.route('/likedStatus/:postId').get(controller.likedStatus); // get liked status

export default router;
