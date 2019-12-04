import { addNewTransaction } from '../../repository/transactionRepository';

const transactionType = {
  CREDIT: 'credit',
  DEBIT: 'debit',
};

const transactionDetails = {
  INITIALIZE: 'created wallet',
  FUND_WALLET: 'funded wallet',
  DEBIT_WALLET: 'debited wallet',
  SEARCH: 'search charges',
};

class TransactionController {

  static async createTransaction(schoolId, txType, txDetails, amount ) {

    const type = transactionType[txType.toUpperCase()];
    const details = transactionDetails[txDetails.toUpperCase()];
    const newTransaction = await addNewTransaction({ schoolId, type, details, amount });

    return newTransaction;
  }
}

const { createTransaction } = TransactionController;
export { createTransaction };
