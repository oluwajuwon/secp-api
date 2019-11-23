import { updateSchool } from '../../repository/schoolRepository';
import { uploadFile } from '../../cloudinaryConfig';

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
        const{ id, name, email, address, phone, logo, verified  } = schoolUpdated[0];
        const updatedSchool = { id, name, email, address, phone, logo, verified };
        response.status(200).json({ message: 'successfully updated your details', updatedSchool });
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
}

const { update, sortUpdateSchoolData, uploadImage } = SchoolController;
export { update, sortUpdateSchoolData, uploadImage };
