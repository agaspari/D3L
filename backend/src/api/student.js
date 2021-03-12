

import { Router } from 'express';
import { fetchUsers, insertUser } from '../persistence/users';

export default ({ config }) => {
    let api = Router();

    api.get('/:classId', (req, res) => {
        const classId = req.params.userId;
    
        fetchUsers(classId, (result) => {
            res.send(result);
        });
    });


    api.post('/class/join/:classId', {
        
    });
    return api;
}