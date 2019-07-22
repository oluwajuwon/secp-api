import models from '../db/models';

const { School } = models;

class SchoolRepository {
  static async saveSchool(...args) {
    console.log('here');
    const newSchool = await School.create(...args);
    return newSchool;
  }
}

const { saveSchool } = SchoolRepository;
export { saveSchool };