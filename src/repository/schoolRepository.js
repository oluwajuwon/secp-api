import models from '../db/models';

const { School } = models;

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

}

const { saveSchool, findSchool, findSchoolById, updateSchool } = SchoolRepository;
export { saveSchool, findSchool, findSchoolById, updateSchool };