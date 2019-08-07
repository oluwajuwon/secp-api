import express from 'express';
import { signup, login } from '../../controllers/admin/AuthController';
import adminValidation from '../../middlewares/adminValidation';

const { validateSignup } = adminValidation;

const adminRouter = express.Router();

adminRouter.post('/signup', validateSignup, signup);
adminRouter.post('/login', login);

export default adminRouter;