import { saveSchool } from '../../repository/schoolRepository';

class AuthController {
  static async signup (request, response){
    const {
      name, email, password, address, phone, logo,
      } = request.body;
      console.log(request.body);
      try{
        const newSchool = await saveSchool({ name, email, password, address, phone, logo });
        console.log(newSchool);
        if(newSchool){
          response.status(201).json({ status: 'success'})
        }
      } catch(error){
        console.log(error);
        response.status(500).json({ message: error.message })
      }
  }

  static async login (){

  }

}

const { signup, login } = AuthController;
export { signup, login };
