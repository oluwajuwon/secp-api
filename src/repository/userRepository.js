import models from '../db/models';

const { User } = models;

class UserRepository {  
  static async addNewUser(...args) {
    const newUser = await User.create(...args);

    return newUser;
  }

}

const { addNewUser } = UserRepository;
export { addNewUser };
