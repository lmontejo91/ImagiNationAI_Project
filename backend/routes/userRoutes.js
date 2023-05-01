import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

//LOGIN route
router.route('/login')
    .post(userController.loginUser);

//REGISTER route
router.route('/register')
    .post(userController.registerUser);

//LOGOUT route
router.route('/logout')
    .post(userController.logoutUser);

export default router;