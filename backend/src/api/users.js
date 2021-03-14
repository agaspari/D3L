import { Router } from 'express';
import { fetchUsers, insertUser, getUserType, getGroup } from '../persistence/users';

export default ({ config }) => {
    let api = Router();

    api.put('/', (req, res) => {
        insertUser(req.body);
    });

    api.get('/userType/:userId', (req, res) => {
        getUserType(req.params.userId, (result) => {
            res.send(result);
        });
    });

    api.get('/group/:userId/:classId', (req, res) => {
        getGroup(req.params.userId, req.params.classId, (result) => {
            res.send(result);
        });
    });

    return api;
}