import { Router } from 'express';
import { insertTask, getTasks, deleteTask, updateTask } from '../persistence/task';

export default ({ config }) => {
    let api = Router();

    api.put('/', (req, res) => {
        console.log(req.body);
        insertTask(req.body);
    });

    api.get('/:groupId', (req, res) => {
        getTasks(req.params.groupId, (result) => {
            res.send(result);
        });
    });

    api.delete('/', (req, res) => {
        deleteTask(req.body.taskId);
    });

    api.post('/update', (req, res) => {

        updateTask(req.body.taskId, req.body.status);
    });
    return api;
}