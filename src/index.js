import dotenv from 'dotenv';
const {express, bodyParser, cors, helmet, morgan} = require('./base/initialDependencies');
const {useInitialDependencies} = require('./base/initialDependenciesUse');
const { startServer } = require('./base/serverStarter');
import { homeRouter, schoolRouter, debtorRouter } from './routes/v1';

dotenv.config();

const app = express();

useInitialDependencies(app, bodyParser, cors, helmet, morgan);

startServer(app)

app.use('/api/v1/school', schoolRouter);
app.use('/api/v1/', debtorRouter);

app.use('/api/v1', homeRouter);

export default app;
