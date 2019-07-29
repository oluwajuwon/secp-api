import express from 'express';
import { addNew } from '../../controllers/debtor/DebtorController';
import { verifyToken } from '../../middlewares/jwtHandler';
import debtorValidation from '../../middlewares/debtorValidation';

const { validateDebtor } = debtorValidation;

const debtorRouter = express.Router();

debtorRouter.post('/debtor', verifyToken, validateDebtor, addNew );


export default debtorRouter;
