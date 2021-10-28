import express from 'express';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import { parseQueryParams } from './middlewares';
import router from './routes';
const apiDocV1 = require('./swagger/api-doc.v1.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(parseQueryParams);

app.use('/api/v1/repos', router);
app.use('/api/v1/docs', serve, setup(apiDocV1));

export default app;
