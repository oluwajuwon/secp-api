import express from 'express';
import { addNew } from '../../controllers/debtor/DebtorController';
import debtorValidation from '../../middlewares/debtorValidation';

const { validateDebtor } = debtorValidation;

const debtorRouter = express.Router();

debtorRouter.post('/debtor', validateDebtor, addNew );


export default debtorRouter;
