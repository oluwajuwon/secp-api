import express from 'express';
import { signup } from '../../controllers/school/AuthController';

const schoolRouter = express.Router();

schoolRouter.post('/signup', signup);
// schoolRouter.post('/login', );

export default schoolRouter;
