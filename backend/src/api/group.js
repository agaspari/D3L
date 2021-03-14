import { Router } from 'express';
import { createGroup, deleteGroup, addMember, removeMember, getAssignees, getGroups, getGroupAssignees } from '../persistence/group';

const keySymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function generateKey(size) {
    if (!size) {
        size = 5;
    }

    let key = "";
    for (let i = 0; i < size; i++) {
        key += keySymbols[Math.floor(Math.random() * keySymbols.length)];
    }

    return key;
}

export default ({ config }) => {
    let api = Router();

    api.put('/create', (req, res) => {
        const key = generateKey(5);
        createGroup(req.body.classId, req.body.groupName, key, (result) => {
            res.send({ key, groupId: result.groupId });

        });

    });

    api.delete('/delete', (req, res) => {
        deleteGroup(req.body.groupKey);
    });

    api.put('/addMember', (req, res) => {
        addMember(req.body.userId, req.body.groupId, req.body.classId);
    });

    api.delete('/removeMember', (req, res) => {
        removeMember(req.body.userId, req.body.groupId);
    });

    api.get('/assignees/:classId', (req, res) => {
        const { classId } = req.params;
        getAssignees(classId, (result) => {
            res.send(result);
        });
    });

    api.get('/:classId', (req, res) => {
        const { classId } = req.params;
        getGroups(classId, (result) => {
            res.send(result);
        });
    });

    api.get('/groupAssigness/:groupId', (req, res) => {
        const { groupId } = req.params;

        getGroupAssignees(groupId, result => {
            res.send(result);
        });
    });

    return api;
}