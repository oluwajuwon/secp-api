import express from 'express';
import { signup, login } from '../../controllers/school/AuthController';
import { update } from '../../controllers/school/SchoolController';
import { verifyToken } from '../../middlewares/jwtHandler';
import authValidation from '../../middlewares/authValidation';
import schoolValidation from '../../middlewares/schoolValidation';

const { validateParams } = schoolValidation;
const { validateSignup, validateLogin } = authValidation;

const schoolRouter = express.Router();

schoolRouter.post('/signup', validateSignup, signup);
schoolRouter.post('/login', validateLogin, login);

schoolRouter.put('/:schoolId', verifyToken, validateParams, update)

export default schoolRouter;
