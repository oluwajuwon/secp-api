import dotenv from 'dotenv';
import {
  saveDebtor, updateDebtor, getDebtorsBySchoolId, getDebtors, searchDebtor
} from '../../repository/debtorRepository';
import { uploadImage } from '../school/AuthController';
import { updateWalletBalance } from '../../helpers/wallet/WalletHelper';
import { createTransaction } from '../../helpers/wallet/TransactionHelper';

dotenv.config();

class DebtorController {
  static async addNew (request, response) {
    const {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      gender,
      schoolName,
      term,
      year,
      classOwed,
      amount,
      paymentStatus,
      studentImage,
    } = request.body

   const { id:schoolId } = request.userData.payload;

    try {
      const { cloudImage: image } = studentImage ? await uploadImage(studentImage) : '';
      const newDebtor = await saveDebtor({
        schoolId,
        firstName,
        lastName,
        middleName,
        dateOfBirth,
        gender,
        schoolName,
        term,
        year,
        classOwed,
        amount,
        paymentStatus,
        image
      });
      if(newDebtor){
        response.status(201).json({ status: 'success'});
      }
    } catch (error){
      response.status(500).json({ message: error.message });
    }

  }

  static async updateDebtorInfo (request, response) {
    const { uuid, paymentStatus } = request.body;

    try{
      const updatedDebtor = await updateDebtor(uuid, paymentStatus.toLowerCase());

      if(updatedDebtor){
        response.status(200).json({ message: `successfully updated the debtor's account`});
      }
    } catch(error) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getAllDebtors (request, response) {
    const { isAdmin, id } = request.userData.payload

    try{
      const allDebtors = isAdmin ? await getDebtors() : await getDebtorsBySchoolId(id);

      if(allDebtors){
        response.status(200).json({ message: 'successfully retrieved all debtors', allDebtors });
      }
    } catch(error) {
      response.status(500).json({ message: error.message });
    }

  }

  static async findDebtor (request, response) {
    const  { firstName, lastName, middleName, dateOfBirth } = request.body;
    const { payload: { id } } = request.userData
    const money = parseFloat(process.env.SEARCH_COST)
    
    try {
      const searchedDebtor = await searchDebtor(firstName, lastName, middleName, dateOfBirth);
      if(searchedDebtor) {
        await updateWalletBalance(id, money, 'DEBIT');
        await createTransaction(id, 'debit', 'search', process.env.SEARCH_COST );
      }
      if(searchedDebtor && searchedDebtor.length < 1 ) {
        return response.status(404).json({ message: 'sorry, no debtors found' })
      }
      return response.status(200).json({ message: 'successfully retrieved debtor', searchedDebtor })

    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

}

const { addNew, updateDebtorInfo, getAllDebtors, findDebtor } = DebtorController;
export { addNew, updateDebtorInfo, getAllDebtors, findDebtor };
