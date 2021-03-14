import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function fetchMessages(classId, callback) {
    fetchQuery('SELECT * FROM messages INNER JOIN users ON messages.userId = users.userId WHERE classId=? ORDER BY dateSent', [ classId ], (result) => {
        if (callback) callback(result);
    })
}

export function insertMessage(message, userId, classId, callback) {
    executeQuery('INSERT INTO messages (userId, classId, content, dateSent) VALUES ?', [ userId, classId, message, new Date() ], (result) => {
        if (callback) callback(result);
    });
} 