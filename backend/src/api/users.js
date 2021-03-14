import { Router } from 'express';
import { fetchUsers, insertUser, getUserType, getGroup, getInfo, updateUser, fetchTasks } from '../persistence/users';

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

    api.get('/info/:userId', (req, res) => {
        getInfo(req.params.userId, (result) => {
            res.send(result);
        });
    });

    api.post('/update/:userId', (req, res) => {
        updateUser(req.params.userId, req.body);
    });

    api.get('/tasks/:userId', (req, res) => {
        fetchTasks(req.params.userId, (result) => {
            res.send(result);
        });
    });

    return api;
}