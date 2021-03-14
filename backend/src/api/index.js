import { Router } from 'express';
import users from './users';
import faculty from './faculty';
import group from './group';
import student from './student';
import classes from './classes';
import messages from './messages';

export default ({ config }) => {
    let api = Router();

    api.get('/', (req, res) => { res.status(200).send("API Online") });
    api.use('/users', users({ config }));
    api.use('/faculty', faculty({ config }));
    api.use('/group', group({ config }));
    api.use('/student', student({ config }));
    api.use('/class', classes({ config }));
    api.use('/messages', messages({ config }));
    return api;
}