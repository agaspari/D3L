import { Router } from 'express';

export default ({ config }) => {
    let api = Router();

    api.get('/', (req, res) => {
        res.status(200).send("Reaching USERS Api");
    });

    return api;
}