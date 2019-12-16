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
  FAILED_FUND: 'wallet funding failed',
};

class TransactionHelper {

  static async createTransaction(schoolId, txType, txDetails, amount, referenceNumber, status ) {

    const type = transactionType[txType.toUpperCase()];
    const details = transactionDetails[txDetails.toUpperCase()];
    const newTransaction = await addNewTransaction({ schoolId, type, details, amount, referenceNumber, status });

    return newTransaction;
  }
}

const { createTransaction } = TransactionHelper;
export { createTransaction };
