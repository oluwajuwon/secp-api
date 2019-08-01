import dotenv from 'dotenv';

dotenv.config();

const { APP_BASE_URL } = process.env;

export default {
  swagger: '2.0',
  info: {
    description: `Documentation of SECP-API. The base url for working with this api is ${APP_BASE_URL}/api/v1`,
    version: '1.0.0',
    title: 'SECP API',
    contact: {
      name: 'SECP',
      url: 'https://github.com/oluwajuwon/secp-api'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  host: APP_BASE_URL,
  basePath: '/api',
  consumes: ['application/json'],
  produces: ['application/json'],

};
