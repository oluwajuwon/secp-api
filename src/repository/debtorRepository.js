import models from '../db/models';

const { Student } = models;

class DebtorRepository {
  static async saveDebtor(...args) {
    const newDebtor = await Student.create(...args);

    return newDebtor;
  }

  static async findDebtor(uuid) {
    const foundDebtor = await Student.findOne({
      where: { uuid },
    });

    return foundDebtor;
  }

  static async updateDebtor(uuid, paymentStatus) {
    const updatedDebtor = await Student.update({ paymentStatus }, 
      {
        where: { uuid }
      });

      return updatedDebtor;
  }

  static async getDebtorsBySchoolId(schoolId) {
    const allDebtors = await Student.findAll({
      where: { schoolId },
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      }
    });

    return allDebtors;
  }

  static async getDebtors(){
    const allDebtors = await Student.findAll({
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      }
    });

    return allDebtors;
  }
}

const {
  saveDebtor, findDebtor, updateDebtor, getDebtorsBySchoolId, getDebtors,
} = DebtorRepository;
export {
  saveDebtor, findDebtor, updateDebtor, getDebtorsBySchoolId, getDebtors,
};
