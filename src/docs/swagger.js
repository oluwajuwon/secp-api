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
  basePath: '/api/v1',
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
    {
      name: 'admin',
      description: 'The main administrator that manages SECP'
    },
  ],
  paths: {
    '/school/signup': {
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
                  type: 'string',
                  format: 'binary',
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
    '/school/login': {
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
                rememberMe: {
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
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Other exceptions'
          }
        }
      }
    },
    '/school/:schoolId': {
      put: {
        tags: ['schools'],
        summary: 'Updating an existing school',
        description: '',
        parameters: [
          {
            name: 'School',
            in: 'body',
            description: 'School object that is to be updated',
            schema: {
              properties: {
                email: {
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
          },
          {
            name: 'token',
            in: 'header',
            required: true,
            type: 'string',
            description: ''
          },
          {
            name: 'schoolId',
            in: 'params',
            required: true,
            type: 'number',
            description: ''
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successfully updated your details',
            schema: {
              properties: {
                message: {
                  type: 'string'
                }
              },
              example: {
                message: 'successfully updated your details',
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
    '/school/auth/forgotPassword': {
      post: {
        tags: ['schools'],
        summary: 'Route for schools that forget their passwords',
        description: '',
        parameters: [
          {
            name: 'School',
            in: 'body',
            description: 'School object that is to request for a password change',
            schema: {
              properties: {
                email: {
                  required: true,
                  type: 'string'
                }
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'mail sent successfully',
            schema: {
              properties: {
                message: {
                  type: 'string'
                }
              },
              example: {
                message: 'Please check your email to reset your password',
              }
            }
          },
          500: {
            description: 'Other exceptions'
          }
        }
      }
    },
    '/school/auth/confirm-code': {
      post: {
        tags: ['schools'],
        summary: 'Route for schools to confirm the code sent to their emails when they forget their passwords',
        description: '',
        parameters: [
          {
            name: 'School',
            in: 'body',
            description: 'School object to verify code sent via email for a password change',
            schema: {
              properties: {
                email: {
                  required: true,
                  type: 'string'
                },
                resetCode: {
                  required: true,
                  type: 'string'
                }
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'code confirmed successfully',
            schema: {
              properties: {
                message: {
                  type: 'string'
                }
              },
              example: {
                message: 'success',
              }
            }
          },
          400: {
            description: 'Bad request',
            schema: {
              properties: {
                message: {
                  type: 'string'
                }
              },
              example: {
                message: 'invalid code supplied',
              },
              message: 'school does not exist',
            }
          }
        },
        500: {
          description: 'Other exceptions'
        }
      }
    },
    '/school/auth/reset-password': {
      post: {
        tags: ['schools'],
        summary: 'Route for schools to reset their passwords',
        description: '',
        parameters: [
          {
            name: 'School',
            in: 'body',
            description: 'School object to change password',
            schema: {
              properties: {
                email: {
                  required: true,
                  type: 'string'
                },
                rawPassword: {
                  required: true,
                  type: 'string'
                }
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'reset password successfully',
            schema: {
              properties: {
                message: {
                  type: 'string'
                }
              },
              example: {
                message: 'success',
                }
            }
          },
          500: {
            description: 'Other exceptions'
          }
        }
      }
    },
    '/debtor': {
      post: {
        tags: ['debtors'],
        summary: 'Adding a new debtor',
        description: '',
        parameters: [
          {
            name: 'Debtor',
            in: 'body',
            description: 'Debtor object that is to be created',
            schema: {
              properties: {
                firstName: {
                  required: true,
                  type: 'string'
                },
                lastName: {
                  required: true,
                  type: 'string'
                },
                middleName: {
                  required: true,
                  type: 'string'
                },
                dateOfBirth: {
                  required: true,
                  type: 'string'
                },
                gender: {
                  required: true,
                  type: 'string'
                },
                schoolName: {
                  required: true,
                  type: 'string'
                },
                term: {
                  required: true,
                  type: 'string'
                },
                year: {
                  required: true,
                  type: 'string'
                },
                classOwed: {
                  required: true,
                  type: 'string'
                },
                amount: {
                  required: true,
                  type: 'number'
                },
                paymentStatus: {
                  required: true,
                  type: 'string'
                },
              }
            }
          },
          {
            name: 'token',
            in: 'header',
            required: true,
            type: 'string',
            description: ''
          }
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Added debtor successfully',
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
      },
      put: {
        tags: ['debtors'],
        summary: 'Updating an existing debtor',
        description: '',
        parameters: [
          {
            name: 'Debtor',
            in: 'body',
            description: 'Debtor object that is to be updated',
            schema: {
              properties: {
                paymentStatus: {
                  required: true,
                  type: 'string'
                },
                uuid: {
                  required: true,
                  type: 'string'
                },
              }
            }
          },
          {
            name: 'token',
            in: 'header',
            required: true,
            type: 'string',
            description: ''
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'updated debtor successfully',
            schema: {
              properties: {
                message: {
                  type: 'string'
                }
              },
              example: {
                message: `successfully updated the debtor's account`,
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
    '/debtors': {
      get: {
        tags: ['debtors'],
        summary: 'Retrieve debtors added by school or all debtors if admin',
        description: '',
        parameters: [
          {
            name: 'token',
            in: 'header',
            required: true,
            type: 'string',
            description: ''
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successfully retrieved all debtors',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                allDebtors: {
                  type: 'array'
                },
              },
              example: {
                status: 'successfully retrieved all debtors',
                allDebtors: [
                  {
                    uuid: 'ververver9venvu9er',
                    schoolId: 2,
                    firstName: 'ajalinkoko',
                    lastName: 'man',
                    middleName: 'sureboy',
                    dateOfBirth: '2019-07-20 00:00:00.000 +00:00',
                    gender: 'female',
                    schoolName: 'limpopo',
                    term: '2nd',
                    year: '2017',
                    classOwed: 'ss3',
                    amount: '20000',
                    paymentStatus: 'no',
                  }
                ],
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
    '/search/debtor': {
      get: {
        tags: ['debtors'],
        summary: 'Search for debtors based on parameters',
        description: '',
        parameters: [
          {
            name: 'token',
            in: 'header',
            required: true,
            type: 'string',
            description: ''
          },
          {
            name: 'School',
            in: 'body',
            description: 'Search object search for debtor',
            schema: {
              properties: {
                firstName: {
                  required: true,
                  type: 'string'
                },
                lastName: {
                  required: true,
                  type: 'string'
                },
                middleName: {
                  required: true,
                  type: 'string'
                },
                dateOfBirth: {
                  required: true,
                  type: 'date'
                }
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successfully retrieved debtor',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                searchedDebtor: {
                  type: 'array'
                },
              },
              example: {
                status: 'successfully retrieved debtor',
                searchedDebtor: [
                  {
                    uuid: 'ververver9venvu9er',
                    schoolId: 2,
                    firstName: 'ajalinkoko',
                    lastName: 'man',
                    middleName: 'sureboy',
                    dateOfBirth: '2019-07-20 00:00:00.000 +00:00',
                    gender: 'female',
                    schoolName: 'limpopo',
                    term: '2nd',
                    year: '2017',
                    classOwed: 'ss3',
                    amount: '20000',
                    paymentStatus: 'no',
                  }
                ],
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
    '/admin/signup': {
      post: {
        tags: ['admin'],
        summary: 'A new admin signup',
        description: '',
        parameters: [
          {
            name: 'Admin',
            in: 'body',
            description: 'Admin object that is to be created',
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
                adminCode: {
                  required: true,
                  type: 'string'
                },
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
    '/admin/login': {
      post: {
        tags: ['admin'],
        summary: 'Login for admin users',
        description: '',
        parameters: [
          {
            name: 'Admin',
            in: 'body',
            description: 'Admin object that is to be logged in',
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
                rememberMe: {
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
                token: {
                  type: 'string'
                }
              },
              example: {
                message: 'Welcome back',
                token: 'vnefjve.fr43$Vreer$@R@fww',
              }
            }
          },
          400: {
            description: 'Validation exception'
          },
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Other exceptions'
          }
        }
      }
    },
  },
};
