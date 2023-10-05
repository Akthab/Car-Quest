import { Router } from 'express';
const router = Router();

import * as controller from '../controllers/appController';

router.route('/login').post(controller.login); // user login
router.route('/register').post(controller.register); // user register
// router.route('/updateUser').post(controller.updateUser); // user update
router.route('/uploadImage').post(controller.uploadImage); //upload image
router.route('/getUserDetailsByHeader').post(controller.getUserDetailsByHeader);

export default router;
