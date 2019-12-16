import { create, find, updateWallet } from '../../repository/walletRepository';

class WalletHelper {
  static async createNewSchoolWallet(schoolId) {
    const currentBalance = 0
    await create(schoolId, currentBalance);
  }

  static async updateWalletBalance (schoolId, amount, operation) {
    switch (operation){
      case 'DEBIT':
          _debitWallet(schoolId, amount);
      default: 
          _creditWallet(schoolId, amount);
    }
  }

  static async _creditWallet(schoolId, amount) {
    try {

    } catch(error) {
      
    }
  }

  static async _debitWallet (schoolId, amount){
    try {
        const foundWallet = await find(schoolId);
        if(foundWallet){
          const newBalance = foundWallet.currentBalance - amount;
          await updateWallet(schoolId, newBalance);
        }
    } catch(error) {
      throw new Error `${error.message}`;
    }
  }
}

const { createNewSchoolWallet, updateWalletBalance, _creditWallet, _debitWallet } = WalletHelper;
export { createNewSchoolWallet, updateWalletBalance, _creditWallet, _debitWallet };
