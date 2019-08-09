import bcrypt from 'bcrypt';
import sendMail from '../../helpers/sendMail';
import { welcomeMail, welcomeMailText } from '../../helpers/mailContent';
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
        const emailSubject = 'Welcome to SECP';

        if(newSchool){
          sendMail(email, emailSubject, welcomeMail, welcomeMailText);
          return response.status(201).json({ status: 'success'});
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
        return response.status(401).json({ message: 'Incorrect login details' });
      }
      const checkPassword = bcrypt.compareSync(password, foundSchool.password);
      
      if(!checkPassword) {
        return response.status(401).json({ message: 'Incorrect login details' });
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

  static async forgotPassword (request, response) {
    const { email } = request.body;

    try {
      const foundSchool = await findSchool(email.trim());
      if(!foundSchool) {
        return response.status(200).json({ message: 'Please check your email to reset your password' });
      }

      await sendPasswordResetEmail(foundSchool);
      return response.status(200).json({ message: 'Please check your email to reset your password' });

    } catch (error){
      response.status(500).json({ error: error.message });
    }
  }

  static async sendPasswordResetEmail (foundSchool) {
    const { email, id } = foundSchool;
    const payload = { id, email };
    const time = { expiresIn: '24hr' };
    const userToken = generateToken({ payload }, time);
    const emailSubject = 'Password Reset on SECP';
    const hostUrl = process.env.HOST_URL;
    const resetMail = `
    <div>
      <h2>Reset your password</h2>
      <p>please click the link below to reset your password. <br> NOTE: this link expires in a day</p>
      <a href="${hostUrl}/${userToken}">Click here to reset your password</a>
    </div>`;

    await sendMail(email, emailSubject, resetMail);
  }
}

const { signup, login, getUserToken, formatDetails, forgotPassword, sendPasswordResetEmail } = AuthController;
export { signup, login, getUserToken, formatDetails, forgotPassword, sendPasswordResetEmail };
