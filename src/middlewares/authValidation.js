import { findSchool } from '../repository/schoolRepository';

class AuthValidation {
  validateSignup = async (request, response, next) => {
    const image = request.files[0];
    const {
      name, email, password, address, phone,
    } = this.trimSignupFields(request.body);

    let errors = await this.isRequestParametersValid(name, email, password, phone, image);

    if (errors.length > 0) {
       return response.status(400).json({ status: 'Error', errors });
    }

    request.body = { name, email, password, address, phone, image };
    return next();
  }

  validateLogin = async (request, response, next) => {
    console.log(request, 'herer');
    const { email, password } = this.trimSignupFields(request.body);

    if (this.isEmailValid(email) === false) {
      return response.status(400).json({ message: 'Please enter a valid email' });
    }
    if (password === '' || password === undefined) {
      return response.status(400).json({ message: 'Please enter a valid password' });
    }

    request.body = { email, password };
    return next();
  }

  trimSignupFields = (request) => {
    const name = request.name ? request.name.trim() : '';
    const email = request.email ? request.email.trim() : '';
    const password = request.password ? request.password.trim() : '';
    const address = request.address ? request.address.trim() : '';
    const phone = request.phone ? request.phone.trim() : '';
    const logo = request.logo ? request.logo.trim() : '';

    return { name, email, password, address, phone, logo };
  }

  isRequestParametersValid = async (name, email, password, phone, image) => {
    const userCount = await findSchool(email);
    let errors = [];

    if (name === '' || name === undefined) {
      errors.push('School name is required')
    }
    if (email === '' || email === undefined) {
        errors.push('Email is required')
    }
    if (this.isEmailValid(email) === false) {
        errors.push('Email is required to be a valid email')
    }
    if (userCount) {
        errors.push('Email is already being used')
    }
    if (password === '' || password === undefined) {
        errors.push('Password is required')
    }
    if (phone === '' || phone === undefined) {
        errors.push('Phone number is required')
    }
    if (image && !this.isImageValid(image)) {
      errors.push('please add a valid image')
    }

    return errors;
 }

  isImageValid = (image) => {
    if(image.mimetype === 'image/jpeg' || image.mimetype === 'image/png' || image.mimetype === 'image/jpg' || image.mimetype === 'image/JPEG') {
      return true;
    }
    return false;
  }

  isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

const authValidation = new AuthValidation();
export default authValidation;
