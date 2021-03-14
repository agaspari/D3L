import { Router } from 'express';
import { fetchUsers, insertUser, getUserType } from '../persistence/users';

export default ({ config }) => {
    let api = Router();

    api.put('/', (req, res) => {
        insertUser(req.body);
    });

    api.get('/userType/:userId', (req, res) => {
        getUserType(req.params.userId, (result) => {
            console.log("HERE", result);
            res.send(result);
        });
    });

    return api;
}