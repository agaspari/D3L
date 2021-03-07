import { Router } from 'express';
import { fetchUsers } from '../persistence/users';

export default ({ config }) => {
    let api = Router();

    api.get('/:classId', (req, res) => {
        const classId = req.params.userId;

        fetchUsers(classId, (result) => {
            res.send(result);
        });
    });

    return api;
}