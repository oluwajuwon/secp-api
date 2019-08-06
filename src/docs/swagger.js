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
  tags: [
    {
      name: 'schools',
      description: 'The schools that have access to SECP'
    },
    {
      name: 'debtors',
      description: 'The students that owe and have been added to SECP'
    },
  ],
  paths: {
    '/schools/signup': {
      post: {
        tags: ['schools'],
        summary: 'A new school signup',
        description: '',
        parameters: [
          {
            name: 'School',
            in: 'body',
            description: 'School object that is to be created',
            schema: {
              properties: {
                email: {
                  required: true,
                  type: 'string'
                },
                password: {
                  required: true,
                  type: 'string'
                },
                name: {
                  required: true,
                  type: 'string'
                },
                address: {
                  required: false,
                  type: 'string'
                },
                phone: {
                  required: true,
                  type: 'string'
                },
                logo: {
                  required: false,
                  type: 'string'
                }
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Signed up successfully',
            schema: {
              properties: {
                status: {
                  type: 'string'
                }
              },
              example: {
                status: 'success',
                }
            }
          },
          400: {
            description: 'Validation exception'
          },
          500: {
            description: 'Other exceptions'
          }
        }
      }
    },
    '/schools/login': {
      post: {
        tags: ['schools'],
        summary: 'Login for schools',
        description: '',
        parameters: [
          {
            name: 'School',
            in: 'body',
            description: 'School object that is to be logged in',
            schema: {
              properties: {
                email: {
                  required: true,
                  type: 'string'
                },
                password: {
                  required: true,
                  type: 'string'
                },
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Logged in successfully',
            schema: {
              properties: {
                message: {
                  type: 'string'
                },
                schoolDetails: {
                  type: 'object'
                },
                token: {
                  type: 'string'
                }
              },
              example: {
                message: 'Welcome back',
                schoolDetails: {
                  id: 1,
                  name: 'new school',
                  email: 'schooly@gmail.com',
                  address: '100, new road',
                  phone: '09131343553',
                  logo: 'https://img.url.com',
                },
                token: 'vnefjve.fr43$Vreer$@R@fww',
              }
            }
          },
          400: {
            description: 'Validation exception'
          },
          500: {
            description: 'Other exceptions'
          }
        }
      }
    },
  },
};
