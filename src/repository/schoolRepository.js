import models from '../db/models';

const { School, UserToken, Wallet, Transaction } = models;

class SchoolRepository {
  static async saveSchool(...args) {
    const newSchool = await School.create(...args);

    return newSchool;
  }

  static async findSchool(email) {
    const foundSchool = await School.findOne({
      where: { email },
      include: [
        {
          model: Wallet,
          as: 'wallet',
          attributes: ['id', 'currentBalance']
        },
        {
          model: Transaction,
          as: 'transaction',
        }
      ],
    });

    return foundSchool;
  }

  static async findSchoolById(id) {
    const foundSchool = await School.findOne({
      where: { id },
      include: [
        {
          model: Wallet,
          as: 'wallet',
          attributes: ['id', 'currentBalance']
        },
        {
          model: Transaction,
          as: 'transaction',
          attributes: {
            exclude: ['id']
          }
        }
      ],
    });

    return foundSchool;
  }

  static async updateSchool(id, email, name, address, phone, logo) {
    const updatedSchool = await School.update({ email, name, address, phone, logo }, 
      {
        where: { id },
        returning: true,
      });

      return updatedSchool[1];
  }

  static async verifySchoolByAdmin(verified, id) {
    const verifiedSchool = await School.update({ verified }, 
      {
        where: { id }
      });

      return verifiedSchool;
  }

  static async resetSchoolPassword(email, password){
    const updatedSchool = await School.update({ password }, 
      {
        where: { email },
        returning: true,
      });

      return updatedSchool[1];
  }

  static async getAllSchools() {
    const allSchools = await School.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    });

    return allSchools
  }

  static async addNewToken(schoolId, code) {
    const schoolToken = await UserToken.create({ schoolId, code });
    return schoolToken;
  }

  static async updateSchoolToken(tokenId, code) {
    const updatedSchoolToken = await UserToken.update({ code },
      {
        where: { id: tokenId }
      });
    return updatedSchoolToken;
  }

  static async findTokenByUserId(schoolId) {
    const foundToken = await UserToken.findOne({
      where: { schoolId }
    });
    return foundToken;
  }

}

const {
  saveSchool, findSchool, findSchoolById, updateSchool, getAllSchools, addNewToken, updateSchoolToken, findTokenByUserId, verifySchoolByAdmin,
  resetSchoolPassword
} = SchoolRepository;
export {
  saveSchool, findSchool, findSchoolById, updateSchool, getAllSchools, addNewToken, updateSchoolToken, findTokenByUserId, verifySchoolByAdmin,
  resetSchoolPassword
};