import { Router } from 'express';
const router = Router();

import * as controller from '../controllers/appController';

router.route('/login').post(controller.login); // login user
router.route('/register').post(controller.register); // register user
router.route('/updateUser').post(controller.updateUser); // update user
router.route('/getUserDetailsByHeader').post(controller.getUserDetailsByHeader); // get user details by header
router.route('/addPost').post(controller.addPost); // add post
router.route('/getAllPosts').get(controller.getAllPosts); //get all posts
router.route('/deletePost/:postId').delete(controller.deletePost); // delete post
router.route('/likedStatus/:postId').get(controller.likedStatus); // get liked status

export default router;
