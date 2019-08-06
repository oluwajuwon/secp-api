import dotenv from 'dotenv';
import { findUser } from '../repository/userRepository';

dotenv.config();

process.env.ADMIN_SECRET_KEY

class AdminValidation {

  validateSignup = async (request, response, next) => {
    const { email, password } = this.trimSignupFields(request.body);

    let errors = await this.isRequestParametersValid(email, password );

    if (errors.length > 0) {
      return response.status(400).json({ status: 'Error', errors });
    }

    request.body = { email, password };
    return next();
  }

  trimSignupFields = (request) => {
    const email = request.email ? request.email.trim() : '';
    const password = request.password ? request.password.trim() : '';

    return { email, password };
  }

  isRequestParametersValid = async (email, password ) => {
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

    return errors;
 }

  isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

const adminValidation = new AdminValidation();
export default adminValidation;
