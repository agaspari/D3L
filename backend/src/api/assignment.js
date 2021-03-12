import { Router } from 'express';
import { fetchUsers, insertUser } from '../persistence/users';

export default ({ config }) => {
    let api = Router();

    api.put('/assignment/create', (req, res) => {

    });
    
    return api;
}