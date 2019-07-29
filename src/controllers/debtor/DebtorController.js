import { saveDebtor } from '../../repository/debtorRepository';

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

    console.log('GOT HERER');

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

}

const { addNew } = DebtorController;
export { addNew };
