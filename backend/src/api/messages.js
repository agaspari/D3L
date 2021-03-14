

import { Router } from 'express';
import { fetchMessages, insertMessage } from '../persistence/messages';  

export default ({ config }) => {
    let api = Router();

    api.get('/:classId', (req, res) => {
        const { classId } = req.params;
        fetchMessages(classId, (result) => {
            res.send({ result });
        });
    });

    api.put('/message/', (req, res) => {
        const { message, userId, classId } = req.body;

        insertMessage(message, userId, classId);
    })
    return api;
}