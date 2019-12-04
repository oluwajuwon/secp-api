import express from 'express';
import { addNew, updateDebtorInfo, getAllDebtors, findDebtor } from '../../controllers/debtor/DebtorController';
import { verifyToken } from '../../middlewares/jwtHandler';
import debtorValidation from '../../middlewares/debtorValidation';

const { validateDebtor, validateDebtorStatus } = debtorValidation;

const debtorRouter = express.Router();

debtorRouter.post('/debtor', verifyToken, validateDebtor, addNew );
debtorRouter.put('/debtor', verifyToken, validateDebtorStatus, updateDebtorInfo);

debtorRouter.get('/debtors', verifyToken, getAllDebtors);
debtorRouter.get('/search/debtor', verifyToken, findDebtor );


export default debtorRouter;
