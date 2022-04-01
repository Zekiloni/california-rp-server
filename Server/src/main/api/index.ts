


import express from 'express';
import cors from 'cors';
import { ServerConfig } from '@configs';
import { logs } from 'src/vehicles';
import { Lang } from '@constants';


export const api = express();

api.use(express.json());

api.use(cors({
   // origin: 'http://yourapp.com'
}));


import './map';
import './account/auth';
import './account/account.core';

api.get('/', (req, res) => {
   res.send(ServerConfig.name);
})

api.listen(ServerConfig.api.port, () => {
   logs.succes(Lang.API_STARTED + ServerConfig.api.port);
})