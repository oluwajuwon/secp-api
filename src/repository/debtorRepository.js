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


}

const { saveDebtor, findDebtor } = DebtorRepository;
export { saveDebtor, findDebtor };