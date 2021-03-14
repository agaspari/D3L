

import { Router } from 'express';
import { fetchUsers } from '../persistence/users';
import { joinClass, fetchStudentClasses } from '../persistence/student';
import { fetchStudents } from '../persistence/classes';

export default ({ config }) => {
    let api = Router();

    api.get('/:classId', (req, res) => {
        const { classId }  = req.params;

        fetchStudents(classId, (result) => {
            res.send({ result });
        });
    });
    return api;
}