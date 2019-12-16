import dotenv from 'dotenv'
import { find } from '../repository/walletRepository';

dotenv.config();

class WalletValidation {
  static async checkWalletBalance(request, response, next){
    const { id:schoolId } = request.userData.payload;

    try {
      const foundWallet = await find(schoolId);

      if(foundWallet.currentBalance < process.env.SEARCH_COST){
        return response.status(400).json({ message: 'insufficient wallet balance' });
      }
      return next();
    } catch (error) {
      return response.status(500).json({ status: 'Error', message: error.message });
    }
  }
}

const { checkWalletBalance } = WalletValidation;
export { checkWalletBalance };