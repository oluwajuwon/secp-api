import { saveSchool } from '../../repository/schoolRepository';

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

  static async login (){

  }

}

const { signup, login } = AuthController;
export { signup, login };
