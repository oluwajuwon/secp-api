import express from 'express';
import { addNew } from '../../controllers/debtor/DebtorController';

const debtorRouter = express.Router();

debtorRouter.post('/debtor', addNew );


export default debtorRouter;
