import { create } from '../../repository/walletRepository';

class WalletController {
  static async createNewSchoolWallet(schoolId) {
    const currentBalance = 0
    await create(schoolId, currentBalance);
  }
}

const { createNewSchoolWallet } = WalletController;
export { createNewSchoolWallet };
