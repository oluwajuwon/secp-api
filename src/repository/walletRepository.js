import models from '../db/models';
import Sequelize from 'sequelize';

const { Wallet } = models;
const Op = Sequelize.Op

class WalletRepository {

  static async create(schoolId, currentBalance) {
    const newSchoolWallet = await Wallet.create({ schoolId, currentBalance });

    return newSchoolWallet;
  }
}

const { create } = WalletRepository;
export { create };