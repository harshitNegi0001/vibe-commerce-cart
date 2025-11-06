import express from 'express';
import Auth from '../controllers/authController.js';
const route = express.Router();

route.post('/auth/login',Auth.login);

export default route;