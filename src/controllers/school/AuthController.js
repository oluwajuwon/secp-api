import bcrypt from 'bcrypt';
import sendMail from '../../helpers/sendMail';
import { welcomeMail, welcomeMailText } from '../../helpers/mailContent';
import { saveSchool, findSchool, addNewToken, updateSchoolToken, findTokenByUserId, resetSchoolPassword } from '../../repository/schoolRepository';

import { generateToken } from '../../middlewares/jwtHandler';
import { uploadFile } from '../../cloudinaryConfig';
import { randomCodeGenerator } from '../../helpers/randomCodeGenerator';

class AuthController {
  static async signup (request, response){
    const {
      name, email, password: rawPassword, address, phone, image,
      } = request.body;
      
      try{
        const password = bcrypt.hashSync(rawPassword, 10);
        const { cloudImage: logo } = image ? await uploadImage(image) : '';
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
        return response.status(400).json({ message: 'Please signup' });
      }

      const code = randomCodeGenerator();
      const foundToken = await findTokenByUserId(foundSchool.id)

      if (!foundToken) await addNewToken(foundSchool.id, code);
      if (foundToken) await updateSchoolToken(foundToken.id, code);
      await sendPasswordResetEmail(foundSchool, code);
      return response.status(200).json({ message: 'Please check your email to reset your password' });

    } catch (error){
      response.status(500).json({ error: error.message });
    }
  }

  static async sendPasswordResetEmail (foundSchool, code) {
    const { email } = foundSchool;
    const emailSubject = 'Password Reset on SECP';
    const resetMail = `
    <div>
      <h2>Reset your password</h2>
      <p>please use the code below to reset your password.</p>
      <p>Code: <b>${code}</b></p>
    </div>`;

    await sendMail(email, emailSubject, resetMail);
  }

  static async resetPassword (request, response) {
    const { password: rawPassword, email } = request.body;
    
    try {
      const password = bcrypt.hashSync(rawPassword, 10);
      const updatedSchool = await resetSchoolPassword(email, password);

      if(updatedSchool) return response.status(200).json({ status: 'success'});
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  static async uploadImage (image) {
    var imageDetails = {
      imageName: image.originalname,
      cloudImage: image.path,
      imageId: ''
    }

    const uploadedImage = await uploadFile(imageDetails.cloudImage);

    var imageDetails = {
      imageName: image.originalname,
      cloudImage: uploadedImage.url,
      imageId: uploadedImage.id,
    }
    return imageDetails;
  }
}

const {
  signup, login, getUserToken, formatDetails, forgotPassword, sendPasswordResetEmail, uploadImage, resetPassword
} = AuthController;
export {
  signup, login, getUserToken, formatDetails, forgotPassword, sendPasswordResetEmail, uploadImage, resetPassword
};
