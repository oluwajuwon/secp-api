import express from 'express';
import { signup, login } from '../../controllers/school/AuthController';
import authValidation from '../../middlewares/authValidation';

const { validateSignup, validateLogin } = authValidation;

const schoolRouter = express.Router();

schoolRouter.post('/signup', validateSignup, signup);
schoolRouter.post('/login', validateLogin, login);

export default schoolRouter;
