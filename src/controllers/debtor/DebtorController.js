import {
  saveDebtor, updateDebtor, getDebtorsBySchoolId, getDebtors,
} from '../../repository/debtorRepository';

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
    } = request.body

   const { id:schoolId } = request.userData.payload;

    try {
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

}

const { addNew, updateDebtorInfo, getAllDebtors } = DebtorController;
export { addNew, updateDebtorInfo, getAllDebtors };
