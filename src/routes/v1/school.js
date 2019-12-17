import express from 'express';
import { signup, login, forgotPassword, resetPassword } from '../../controllers/school/AuthController';
import { update, confirmPasswordResetCode, getSchool } from '../../controllers/school/SchoolController';
import { getSchools } from '../../controllers/admin/AdminController';
import { verifyToken } from '../../middlewares/jwtHandler';
import adminValidation from '../../middlewares/adminValidation';
import authValidation from '../../middlewares/authValidation';
import schoolValidation from '../../middlewares/schoolValidation';
import { fundWallet } from '../../controllers/school/WalletController';
import upload from '../../multerConfig';

const { validateParams } = schoolValidation;
const { verifyAdmin } = adminValidation;
const { validateSignup, validateLogin } = authValidation;

const schoolRouter = express.Router();

//Auth school routes
schoolRouter.post('/signup', upload.any(), validateSignup,  signup);
schoolRouter.post('/login', validateLogin, login);
schoolRouter.post('/auth/forgot-password', forgotPassword)
schoolRouter.post('/auth/confirm-code', confirmPasswordResetCode)
schoolRouter.put('/auth/reset-password', resetPassword)

schoolRouter.put('/:schoolId', upload.any(), verifyToken, validateParams, update)

schoolRouter.post('/fund-wallet', verifyToken, fundWallet);
schoolRouter.get('/all-schools', verifyToken, verifyAdmin, getSchools);
schoolRouter.get('/', verifyToken, getSchool);

export default schoolRouter;
