import express from 'express';
import { signup } from '../../controllers/admin/AuthController';

const adminRouter = express.Router();

adminRouter.post('/signup', signup);

export default adminRouter;