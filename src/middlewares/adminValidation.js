import dotenv from 'dotenv';
import { findUser } from '../repository/userRepository';

dotenv.config();

class AdminValidation {

  validateSignup = async (request, response, next) => {
    const { email, password, adminCode } = this.trimSignupFields(request.body);

    let errors = await this.isRequestParametersValid(email, password, adminCode );

    if (errors.length > 0) {
      return response.status(400).json({ status: 'Error', errors });
    }

    request.body = { email, password };
    return next();
  }

  trimSignupFields = (request) => {
    const email = request.email ? request.email.trim() : '';
    const password = request.password ? request.password.trim() : '';
    const adminCode = request.adminCode ? request.adminCode.trim() : '';

    return { email, password, adminCode };
  }

  isRequestParametersValid = async (email, password, adminCode ) => {
    const userCount = await findUser(email);
    let errors = [];

    if (email === '' || email === undefined) {
        errors.push('Email is required')
    }
    if (email && this.isEmailValid(email) === false) {
        errors.push('Email is required to be a valid email')
    }
    if (userCount) {
        errors.push('Email is already being used')
    }
    if (password === '' || password === undefined) {
        errors.push('Password is required')
    }
    if (adminCode !== process.env.ADMIN_SECRET_KEY ) {
      errors.push('Please enter a valid code');
    }

    return errors;
 }

  isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

const adminValidation = new AdminValidation();
export default adminValidation;
