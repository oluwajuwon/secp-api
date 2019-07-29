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
}

const { saveDebtor, findDebtor, updateDebtor } = DebtorRepository;
export { saveDebtor, findDebtor, updateDebtor };
