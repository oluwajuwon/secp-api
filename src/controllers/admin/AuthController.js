import bcrypt from 'bcrypt';
import { addNewUser } from '../../repository/userRepository';

class AuthController {
 static async signup (request, response) {
  const { email, password: rawPassword } = request.body;
  const isAdmin = true;
    
    try{
      const password = bcrypt.hashSync(rawPassword, 10);
      const newUser = await addNewUser({ email, password, isAdmin });

      if(newUser){
        response.status(201).json({ status: 'success'});
      }
    } catch(error){
      response.status(500).json({ message: error.message });
    }
 }

}

const { signup, login } = AuthController;
export { signup, login };