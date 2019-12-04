import models from '../db/models';
import Sequelize from 'sequelize';

const { Student } = models;
const Op = Sequelize.Op

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

  static async getDebtors() {
    const allDebtors = await Student.findAll({
      where: { paymentStatus: 'No' },
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      }
    });

    return allDebtors;
  }

  static async searchDebtor(firstName, lastName, middleName, dateOfBirth) {
    const searchedDebtor = await Student.findAll({
      where: {

        [Op.and]: [
          {
            firstName: firstName
          },
          {
            lastName: lastName
          },
          {
            dateOfBirth: dateOfBirth
          },
          {
            middleName: { [Op.like]: `%${middleName}%` }
          }
        ]
      }
    });

    return searchedDebtor;
  }
}

const {
  saveDebtor, findDebtor, updateDebtor, getDebtorsBySchoolId, getDebtors, searchDebtor
} = DebtorRepository;
export {
  saveDebtor, findDebtor, updateDebtor, getDebtorsBySchoolId, getDebtors, searchDebtor
};
