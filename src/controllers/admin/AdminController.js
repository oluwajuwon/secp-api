import { getAllSchools } from '../../repository/schoolRepository';

class AdminController {

  static async getSchools (request, response) {
    try {
      const allSchools = await getAllSchools();

      if(allSchools){
        response.status(200).json({ message: 'successfully retrieved all schools', allSchools });
      }
    } catch(error) {
      response.status(500).json({ message: error.message });
    }
  }
}

const { getSchools } = AdminController;
export { getSchools };