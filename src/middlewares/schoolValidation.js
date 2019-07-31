import { findSchoolById } from '../repository/schoolRepository';

class SchoolValidation {

  validateParams = async (request, response, next) => {
    const { schoolId:id } = request.params;

    try{
      const { errors, foundSchool } = await this.validateSchoolId(id, request.userData);

      if (errors.length > 0) {
        return response.status(400).json({ status: 'Error', errors });
      }
      
      request.foundSchool = foundSchool;
      return next();

    } catch(error) {
        return response.status(500).json({ status: 'Error', message: error.message });
    }
  }

  validateSchoolId = async (id, userData) => {
    let errors = [];
    const foundSchool = await findSchoolById(id)

    if (isNaN(parseInt(id))) {
      errors.push('Please enter a valid id')
    }
    if(!foundSchool) {
      errors.push('School does not exist')
    }
    if(foundSchool.id !== userData.payload.id) {
      errors.push(`You can't edit this information`)
    }

    return { errors, foundSchool };
  }

}

const schoolValidation = new SchoolValidation();
export default schoolValidation;
