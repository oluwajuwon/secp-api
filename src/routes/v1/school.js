import express from 'express';
import { signup, login } from '../../controllers/school/AuthController';
import authValidation from '../../middlewares/authValidation';

const { validateSignup } = authValidation;

const schoolRouter = express.Router();

schoolRouter.post('/signup', validateSignup, signup);
schoolRouter.post('/login', login);

export default schoolRouter;
