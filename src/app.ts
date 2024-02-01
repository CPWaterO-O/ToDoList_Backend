import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { DutyService } from './Services/dutyService';
import { DutyRouter } from './Routers/dutyRouter';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export const dutyService = new DutyService();
const dutyRouter = new DutyRouter(dutyService);

app.use('/duty',dutyRouter.router())

app.listen(8080 ,()=>{
    console.log('app listening on port 8080')
})