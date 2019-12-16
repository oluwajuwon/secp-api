import models from '../db/models';
import Sequelize from 'sequelize';

const { Wallet } = models;
const Op = Sequelize.Op

class WalletRepository {

  static async create(schoolId, currentBalance) {
    const newSchoolWallet = await Wallet.create({ schoolId, currentBalance });

    return newSchoolWallet;
  }

  static async find(schoolId) {
    const foundWallet = await Wallet.findOne({
      where: { schoolId },
    });

    return foundWallet;
  }

  static async updateWallet(schoolId, currentBalance) {
    const updatedWallet = await Wallet.update({ currentBalance },
      {
        where: { schoolId },
        returning: true, 
      });

      return updatedWallet[1];
  }
}

const { create, find, updateWallet } = WalletRepository;
export { create, find, updateWallet };