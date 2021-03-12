import { Router } from 'express';
import users from './users';
import faculty from './faculty';

export default ({ config }) => {
    let api = Router();

    api.get('/', (req, res) => { res.status(200).send("API Online") });
    api.use('/users', users({ config }));
    api.use('/faculty', faculty({ config }));
    return api;
}