import bcrypt from 'bcrypt';
import { addNewUser, findUser } from '../../repository/userRepository';
import { generateToken } from '../../middlewares/jwtHandler';

class AuthController {
  static async signup(request, response) {
    const { email, password: rawPassword } = request.body;
    const isAdmin = true;

    try {
      const password = bcrypt.hashSync(rawPassword, 10);
      const newUser = await addNewUser({ email, password, isAdmin });

      if (newUser) {
        response.status(201).json({ status: 'success' });
      }
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  static async login (request, response){
    const { email, password, rememberMe } = request.body;
    
    try{
      const foundUser = await findUser(email);
      
      if(!foundUser) {
        return response.status(401).json({ message: 'Incorrect login details' });
      }
      const checkPassword = bcrypt.compareSync(password, foundUser.password);
      
      if(!checkPassword) {
        return response.status(401).json({ message: 'Incorrect login details' });
      }
      
      const token = await getUserToken(foundUser, rememberMe);
      
      return response.status(200).json({ message: 'Welcome back Admin', token });
    } catch(error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getUserToken(foundUser, rememberMe) {
    const { id, email } = foundUser;
    const payload = { id, email, isAdmin: true };
    const time = {};

    if (!rememberMe) {
      time.expiresIn = '24h';
    } else {
      time.expiresIn = '240h';
    }
    const token = await generateToken(payload, time);
    return token;
  }

}

const { signup, login, getUserToken } = AuthController;
export { signup, login };