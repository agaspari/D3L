import cors from 'cors';
import config from './config.json';
import bodyParser from 'body-parser';
import express from 'express';
import api from './api';
import middleware from './middleware';
import { initalizeConnection } from './util/database';

/* Express Setup */

const app = express();
const PORT = config.expressSettings.port;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(middleware({ config }));
app.use('/api', api({ config }));

app.listen(PORT, () => {
	console.log(`Your server is running on port: ${PORT}`);
});


/* Database */
//initalizeConnection();