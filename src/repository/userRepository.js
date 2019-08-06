import models from '../db/models';

const { User } = models;

class UserRepository {  
  static async addNewUser(...args) {
    const newUser = await User.create(...args);

    return newUser;
  }

  static async findUser(email) {
    const foundUser = await User.findOne({
      where: { email },
    });

    return foundUser;
  }

}

const { addNewUser, findUser } = UserRepository;
export { addNewUser, findUser };
