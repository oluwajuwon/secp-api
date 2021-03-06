import { updateWalletBalance } from '../../helpers/wallet/WalletHelper';
import { createTransaction } from '../../helpers/wallet/TransactionHelper';
import { findSchoolById } from '../../repository/schoolRepository';
import { formatDetails } from './AuthController';
class WalletController {
  static async fundWallet(request, response) {
    const { amount, reference, status } = request.body;
    const { payload: { id } } = request.userData
    const money = parseFloat(amount);

    try {
      if (status !== 'success') {
        await createTransaction(id, 'credit', 'failed_fund', money, reference, status);
        return response.status(400).json({ message: 'sorry, wallet was not funded' });
      }

      const updatedBalance = await updateWalletBalance(id, money, 'CREDIT');

      if(updatedBalance) {
        await createTransaction(id, 'credit', 'fund_wallet', money, reference, status);
        const foundSchool = await findSchoolById(updatedBalance[0].schoolId);

        if(foundSchool) {
          const schoolDetails = await formatDetails(foundSchool);
          return response.status(200).json({ message: 'wallet funded successfully', schoolDetails });
        }
      }
    } catch(error) {
      response.status(500).json({ message: error.message });
    }
  }
}

const { fundWallet } = WalletController;
export { fundWallet };
