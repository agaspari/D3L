import { Router } from 'express';
import { fetchFacultyClasses, insertFacultyClass } from '../persistence/faculty';
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

    api.get('/classes/:facultyId', (req, res) => {
        fetchFacultyClasses(req.params.facultyId, (result) => {
            res.send(result);
        });
    });

    api.post('/class/create/', (req, res) => {
        const key = generateKey(5);
        insertFacultyClass(req.body, key);
        res.send({ key });
    });


    return api;
}