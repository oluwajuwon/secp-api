import models from '../db/models';
import Sequelize from 'sequelize';

const { Transaction } = models;
const Op = Sequelize.Op

class TransactionRepository {
  static async addNewTransaction(...args) {
    const newTransaction = await Transaction.create(...args);

    return newTransaction;
  }
}

const { addNewTransaction } = TransactionRepository;
export { addNewTransaction };
