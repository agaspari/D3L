import { Router } from 'express';
import users from './users';

export default ({ config }) => {
    let api = Router();

    api.get('/', (req, res) => { res.status(200).send("API Online") });
    api.use('/users', users({ config }));

    return api;
}