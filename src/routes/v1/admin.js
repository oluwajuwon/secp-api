import express from 'express';
import { signup, login } from '../../controllers/admin/AuthController';
import adminValidation from '../../middlewares/adminValidation';
import authValidation from '../../middlewares/authValidation';

const { validateSignup } = adminValidation;
const { validateLogin } = authValidation;

const adminRouter = express.Router();

adminRouter.post('/signup', validateSignup, signup);
adminRouter.post('/login', validateLogin, login);

export default adminRouter;