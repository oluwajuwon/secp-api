import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class JwtHandler {

  static generateToken(payload, time) {
    const token = jwt.sign({ payload }, process.env.TOKEN_SECRET_KEY, time);
    return token;
  }

  static verifyToken(request, response, next) {
    const token = request.headers.token || request.body.token;
    if (!token) {
      return response.status(403).json({ message: 'please login or signup'});
    }
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, userData) => {
      if (error) {
        if (error.message.includes('signature')) {
          return response.status(403).json({ message: 'Your input is not a JWT token' });
        }
        return response.status(403).json({ message: error.message });
      }
      request.userData = userData;
      return next();
    });
  }

}

const { generateToken, verifyToken } = JwtHandler;
export { generateToken, verifyToken };
