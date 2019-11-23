import models from '../db/models';

const { School, UserToken } = models;

class SchoolRepository {
  static async saveSchool(...args) {
    const newSchool = await School.create(...args);

    return newSchool;
  }

  static async findSchool(email) {
    const foundSchool = await School.findOne({
      where: { email },
    });

    return foundSchool;
  }

  static async findSchoolById(id) {
    const foundSchool = await School.findOne({
      where: { id },
    });

    return foundSchool;
  }

  static async updateSchool(id, email, name, address, phone, logo) {
    const updatedSchool = await School.update({ email, name, address, phone, logo }, 
      {
        where: { id }
      });

      return updatedSchool;
  }

  static async verifySchoolByAdmin(verified, id) {
    const verifiedSchool = await School.update({ verified }, 
      {
        where: { id }
      });

      return verifiedSchool;
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
    console.log(schoolId);
    const schoolToken = await UserToken.create({ userId: schoolId, code });
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
      where: {userId: schoolId}
    });
    return foundToken;
  }

}

const {
  saveSchool, findSchool, findSchoolById, updateSchool, getAllSchools, addNewToken, updateSchoolToken, findTokenByUserId, verifySchoolByAdmin
} = SchoolRepository;
export {
  saveSchool, findSchool, findSchoolById, updateSchool, getAllSchools, addNewToken, updateSchoolToken, findTokenByUserId, verifySchoolByAdmin
};