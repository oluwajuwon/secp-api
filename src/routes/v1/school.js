import express from 'express';
import { signup, login, forgotPassword } from '../../controllers/school/AuthController';
import { update } from '../../controllers/school/SchoolController';
import { getSchools } from '../../controllers/admin/AdminController';
import { verifyToken } from '../../middlewares/jwtHandler';
import adminValidation from '../../middlewares/adminValidation';
import authValidation from '../../middlewares/authValidation';
import schoolValidation from '../../middlewares/schoolValidation';

const { validateParams } = schoolValidation;
const { verifyAdmin } = adminValidation;
const { validateSignup, validateLogin } = authValidation;

const schoolRouter = express.Router();

//Auth school routes
schoolRouter.post('/signup', validateSignup, signup);
schoolRouter.post('/login', validateLogin, login);
schoolRouter.post('/auth/forgotPassword', forgotPassword)

schoolRouter.put('/:schoolId', verifyToken, validateParams, update)

schoolRouter.get('/', verifyToken, verifyAdmin, getSchools);

export default schoolRouter;
