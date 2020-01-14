import express from 'express';
import { addNew, updateDebtorInfo, getAllDebtors, findDebtor } from '../../controllers/debtor/DebtorController';
import { verifyToken } from '../../middlewares/jwtHandler';
import debtorValidation from '../../middlewares/debtorValidation';
import { checkWalletBalance } from '../../middlewares/walletValidation';
import upload from '../../multerConfig';

const { validateDebtor, validateDebtorStatus, validateDebtorSearchInput } = debtorValidation;

const debtorRouter = express.Router();

debtorRouter.post('/debtor', verifyToken, upload.any(), validateDebtor, addNew );
debtorRouter.put('/debtor', verifyToken, validateDebtorStatus, updateDebtorInfo);

debtorRouter.get('/debtors', verifyToken, getAllDebtors);
debtorRouter.post('/search/debtor', verifyToken, checkWalletBalance, validateDebtorSearchInput, findDebtor );


export default debtorRouter;
