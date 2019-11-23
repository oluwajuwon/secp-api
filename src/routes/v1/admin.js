import express from 'express';
import { signup, login } from '../../controllers/admin/AuthController';
import { verifySchool } from '../../controllers/admin/AdminController'
import adminValidation from '../../middlewares/adminValidation';
import authValidation from '../../middlewares/authValidation';
import { verifyToken } from '../../middlewares/jwtHandler';

const { validateSignup } = adminValidation;
const { validateLogin } = authValidation;

const adminRouter = express.Router();

adminRouter.post('/signup', validateSignup, signup);
adminRouter.post('/login', validateLogin, login);
adminRouter.put('/verify-school/:schoolId', verifyToken, verifySchool)

export default adminRouter;