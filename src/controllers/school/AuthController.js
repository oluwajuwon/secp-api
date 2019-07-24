import { saveSchool, findSchool } from '../../repository/schoolRepository';

class AuthController {
  static async signup (request, response){
    const {
      name, email, password, address, phone, logo,
      } = request.body;

      try{
        const newSchool = await saveSchool({ name, email, password, address, phone, logo });

        if(newSchool){
          response.status(201).json({ status: 'success'});
        }
      } catch(error){
        response.status(500).json({ message: error.message });
      }
  }

  static async login (request, response){
    const { email, password } = request.body;
    
    try{
      const foundSchool = await findSchool(email);

      if(!foundSchool) {
        return response.status(400).json({ message: 'Incorrect login details' });
      }
      if(foundSchool && foundSchool.password !== password) {
        return response.status(400).json({ message: 'Incorrect login details' });
      }

      return response.status(200).json({ message: 'Welcome back' });
    } catch(error) {
      response.status(500).json({error: error.message});
    }
  }

}

const { signup, login } = AuthController;
export { signup, login };
