import models from '../db/models';

const { School } = models;

class SchoolRepository {
  static async saveSchool(...args) {
    const newSchool = await School.create(...args);

    return newSchool;
  }

  static async findSchool(email) {
    const foundSchool = await School.findOne({
      where: { 
        email
      },
    });

    return foundSchool;
  }


}

const { saveSchool, findSchool } = SchoolRepository;
export { saveSchool, findSchool };