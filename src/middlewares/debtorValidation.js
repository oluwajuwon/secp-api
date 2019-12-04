import { findDebtor }from '../repository/debtorRepository';

class DebtorValidation {
  validateDebtor = async (request, response, next) => {
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
    } = this.trimDebtorFields(request.body);

    let errors = await this.isRequestParametersValid(
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
      paymentStatus
      );

      if (errors.length > 0) {
        return response.status(400).json({ status: 'Error', errors });
      }
  
      request.body = { firstName,
        lastName,
        middleName,
        dateOfBirth,
        gender,
        schoolName,
        term,
        year,
        classOwed,
        amount,
        paymentStatus };
      return next();

  }

  trimDebtorFields = (request) => {
    const firstName = request.firstName ? request.firstName.trim() : '';
    const lastName = request.lastName ? request.lastName.trim() : '';
    const middleName = request.middleName ? request.middleName.trim() : '';
    const dateOfBirth = request.dateOfBirth ? request.dateOfBirth.trim() : '';
    const gender = request.gender ? request.gender.trim() : '';
    const schoolName = request.schoolName ? request.schoolName.trim() : '';
    const term = request.term ? request.term.trim() : '';
    const year = request.year ? request.year.trim() : '';
    const classOwed = request.classOwed ? request.classOwed.trim() : '';
    const amount = request.amount ? request.amount.trim() : '';
    const paymentStatus = request.paymentStatus ? request.paymentStatus.trim() : '';

    return {
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
      paymentStatus };
  }

  isRequestParametersValid = async (
    firstName, lastName, middleName, dateOfBirth, gender,
    schoolName, term, year,classOwed, amount, paymentStatus
    ) => {
    let errors = [];
    const status = ['yes','no'];

    if (firstName === '' || firstName === undefined) {
      errors.push(`Student's first name is required is required`)
    }
    if (lastName === '' || lastName === undefined) {
      errors.push(`Student's last name is required`)
    }
    if (middleName === '' || middleName === undefined) {
      errors.push('Middle name is required')
    }
    if (this.isDateValid(dateOfBirth) === false) {
      errors.push('Date of birth should in this format (yyyy-mm-dd)')
    }
    if (gender === '' || gender === undefined) {
      errors.push('Gender is required')
    }
    if (schoolName === '' || schoolName === undefined) {
      errors.push('School name is required')
    }
    if (term === '' || term === undefined) {
      errors.push('The owed term is required')
    }
    if (year === '' || year === undefined) {
      errors.push('The school year owed is required')
    }
    if (classOwed === '' || classOwed === undefined) {
      errors.push('The class owed in is required')
    }
    if (amount === '' || amount === undefined) {
      errors.push('Please enter a valid amount')
    }
    if(isNaN(amount)) {
      errors.push('Please enter a valid amount')      
    }
    if (paymentStatus === '' || paymentStatus === undefined) {
      errors.push(`The debtor's payment status is required`)
    }
    if (!status.includes(paymentStatus.toLowerCase().trim())) {
      errors.push('The status should either be yes or no')
    }

    return errors;
 }

  isDateValid = (date) => {
    return /^\d{4}-\d{1,2}\-\d{1,2}$/.test(date);
  }

  validateDebtorStatus = async (request, response, next) => {
    const { uuid, paymentStatus } = request.body;
    const { id } = request.userData.payload;

    try{
      const errors = await this.validateDebtorUpdate(uuid, paymentStatus,id);
  
      if (errors.length > 0) {
        return response.status(400).json({ status: 'Error', errors });
      }

      request.body = { uuid, paymentStatus };
      return next();

    } catch(error) {
      return response.status(500).json({ status: 'Error', message: error.message });
    }

  }


  validateDebtorUpdate = async (uuid, paymentStatus, schoolId) => {
    let errors = [];
    const status = ['yes','no'];


    try {
      const debtorCount = await findDebtor(uuid);

      if (!debtorCount) {
        errors.push('This debtor does not exist')
      }

      if (!status.includes(paymentStatus.toLowerCase().trim())) {
        errors.push('The status should either be yes or no')
      }

      if (schoolId !== debtorCount.schoolId) {
        errors.push(`sorry you can't edit this debtor's details`)
      }

    } catch (error) {
      errors.push(error.message)
    }

    return errors;

  }

}

const debtorValidation = new DebtorValidation();
export default debtorValidation;
