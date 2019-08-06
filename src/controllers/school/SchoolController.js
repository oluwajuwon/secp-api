import { updateSchool } from '../../repository/schoolRepository';

class SchoolController {
  static async update(request, response) {

    const { schoolId, email, name, address, phone, logo } = await sortUpdateSchoolData(request);

    try{
      const updatedSchool = await updateSchool(schoolId,
        email.trim(), name.trim(), address.trim(), phone.trim(), logo.trim(),
        );

      if(updatedSchool){
        response.status(200).json({ message: 'successfully updated your details' });
      }
    } catch(error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async sortUpdateSchoolData(request) {
    const { foundSchool } = request;

    const schoolId = foundSchool.id;
    const name = request.body.name || foundSchool.name;
    const email = request.body.email || foundSchool.email;
    const address = request.body.address || foundSchool.address;
    const phone = request.body.phone || foundSchool.phone;
    const logo = request.body.logo || foundSchool.logo;

    return { schoolId, email, name, address, phone, logo };
  }

}

const { update, sortUpdateSchoolData } = SchoolController;
export { update, sortUpdateSchoolData };
