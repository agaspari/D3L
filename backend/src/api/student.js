

import { Router } from 'express';
import { fetchUsers } from '../persistence/users';
import { joinClass, fetchStudentClasses } from '../persistence/student';

export default ({ config }) => {
    let api = Router();

    // api.get('/:classId', (req, res) => {
    //     const classId = req.params.userId;
    
    //     fetchUsers(classId, (result) => {
    //         res.send(result);
    //     });
    // });

    api.get('/classes/:userId', (req, res) => {
        const { userId } = req.params;

        fetchStudentClasses(userId, (result) => {
            res.send({ result });
        });
    });

    api.post('/class/join/', (req, res) => {
        const { classKey, userId }  = req.body;

        joinClass(userId, classKey, (result) => {
            res.send({ result });
        });
    });
    return api;
}