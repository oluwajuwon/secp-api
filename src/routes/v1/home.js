import express from 'express';

const homeRouter = express.Router();

homeRouter.get('/index', (request, response) => response.status(200)
  .json({ message: 'welcome to SECP-API' }));

homeRouter.all('*', (request, response) => response.status(404)
  .json({ message: 'oops! This page does not exist' })
  );

export default homeRouter;
