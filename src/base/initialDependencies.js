const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = express.Router();
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger';

export {express, bodyParser, cors, helmet, morgan, router, swaggerUI, swaggerDocument};
