import express from 'express';
import { signup } from '../../controllers/admin/AuthController';
import adminValidation from '../../middlewares/adminValidation';

const { validateSignup } = adminValidation;

const adminRouter = express.Router();

adminRouter.post('/signup', validateSignup, signup);

export default adminRouter;