import bcrypt from 'bcrypt';
import { saveSchool, findSchool } from '../../repository/schoolRepository';
import { generateToken } from '../../middlewares/jwtHandler';

class AuthController {
  static async signup (request, response){
    const {
      name, email, password: rawPassword, address, phone, logo,
      } = request.body;
      
      try{
        const password = bcrypt.hashSync(rawPassword, 10);
        const newSchool = await saveSchool({ name, email, password, address, phone, logo });

        if(newSchool){
          response.status(201).json({ status: 'success'});
        }
      } catch(error){
        response.status(500).json({ message: error.message });
      }
  }

  static async login (request, response){
    const { email, password, rememberMe } = request.body;
    
    try{
      const foundSchool = await findSchool(email);
      
      if(!foundSchool) {
        return response.status(400).json({ message: 'Incorrect login details' });
      }
      const checkPassword = bcrypt.compareSync(password, foundSchool.password);
      
      if(!checkPassword) {
        return response.status(400).json({ message: 'Incorrect login details' });
      }
      
      const token = await getUserToken(foundSchool, rememberMe);
      const schoolDetails = await formatDetails(foundSchool);
      
      return response.status(200).json({ message: 'Welcome back', schoolDetails, token });
    } catch(error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getUserToken(foundUser, rememberMe) {
    const { id, email } = foundUser;
    const payload = { id, email, isAdmin: false };
    const time = {};

    if (!rememberMe) {
      time.expiresIn = '24h';
    } else {
      time.expiresIn = '240h';
    }
    const token = await generateToken(payload, time);
    return token;
  }

  static async formatDetails(school) {
    const { id,name, email, address, phone,logo } = school;
    const schoolDetails = {
      id,name, email, address, phone,logo
    }

    return schoolDetails;
  }

}

const { signup, login, getUserToken, formatDetails } = AuthController;
export { signup, login, getUserToken, formatDetails };
