import bcrypt from 'bcrypt';
import { updateSchool, findSchool, findTokenByUserId, findSchoolById, resetSchoolPassword } from '../../repository/schoolRepository';
import { uploadFile } from '../../cloudinaryConfig';
import { formatDetails } from './AuthController';

class SchoolController {
  static async update(request, response) {

    const image = request.files[0];
    const { schoolId, email, name, address, phone} = await sortUpdateSchoolData(request);
    const { cloudImage: logo } = image ? await uploadImage(image) : '';

    try{
      const schoolUpdated = await updateSchool(schoolId,
        email.trim(), name.trim(), address.trim(), phone.trim(), logo,
        );

      if(schoolUpdated){
        const updatedSchool = await findSchool(schoolUpdated[0].email);
        if(updatedSchool){
          const schoolDetails = await formatDetails(updatedSchool);
          response.status(200).json({ message: 'successfully updated your details', schoolDetails });
        }
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

    return { schoolId, email, name, address, phone };
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

  static async confirmPasswordResetCode (request, response) {
    const { email, resetCode } = request.body;

    try {
      const foundSchool = await findSchool(email);
      if(!foundSchool) {
        return response.status(400).json({ message: 'school does not exist' });
      }

      const foundResetCode = await findTokenByUserId(foundSchool.id);

      if(foundResetCode.code !== resetCode) {
        return response.status(400).json({ message: 'invalid code supplied' });
      }

      return response.status(200).json({ message: 'success' });

    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getSchool (request, response) {
    const { payload: { id } } = request.userData;

    try{
      const foundSchool = await findSchoolById(id);

      if(foundSchool){
        const schoolDetails = await formatDetails(foundSchool);
        return response.status(200).json({ message: 'success', schoolDetails });
      }
    } catch(error) {
      response.status(500).json({ message: error.message });
    }
  }

  static async changePassword (request, response) {
    const { newPassword, oldPassword } = request.body 
    const { payload: { id, email } } = request.userData;
    
    try {
      const foundSchool = await findSchoolById(id);
      const checkPassword = bcrypt.compareSync(oldPassword, foundSchool.password);

      if(!checkPassword) {
        return response.status(400).json({ message: 'Incorrect old password' });
      }
      const password = bcrypt.hashSync(newPassword, 10);
      const updatedSchool = await resetSchoolPassword(email, password);

      if(updatedSchool){
        return response.status(200).json({ message: 'Password successfully changed' });
      }

    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

const { update, sortUpdateSchoolData, uploadImage, confirmPasswordResetCode, getSchool, changePassword } = SchoolController;
export { update, sortUpdateSchoolData, uploadImage, confirmPasswordResetCode, getSchool, changePassword };
