import { getAllSchools, verifySchoolByAdmin, findSchoolById } from '../../repository/schoolRepository';

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

  static async verifySchool(request, response) {
    const { schoolId } = request.params;
    const verified = true;
    try {
      const foundSchool = await findSchoolById(schoolId);

      if(!foundSchool){
        return response.status(400).json({ message: 'school does not exist'});
      }

      const verifiedSchool = await verifySchoolByAdmin(verified, foundSchool.id)
      if(verifiedSchool){
        response.status(200).json({ message: 'successfully verified school'});
      }
    }catch(error) {
      response.status(500).json({ message: error.message });
    }
  }
}

const { getSchools, verifySchool } = AdminController;
export { getSchools, verifySchool };