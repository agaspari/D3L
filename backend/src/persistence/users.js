import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function fetchUsers(guildId, callback) {
    fetchQuery('SELECT * FROM users u WHERE u.userId IN (SELECT userId FROM classAssignees WHERE classId=1 AND userId=u.userId) ORDER BY name ASC;', [guildId], (result) => {
        if (callback) callback(result);
    });
}

export function insertUser(userInfo, callback) {
    executeQuery('INSERT INTO users VALUES ?', [ userInfo.userId, userInfo.role, (userInfo.firstname + " " + userInfo.lastname), userInfo.email, userInfo.password ], (result) => {
        if (callback) callback(result);
    });
}

export function getUserType(userId, callback) {
    fetchQuery('SELECT role FROM users WHERE userId = ?', [ userId ], (result) => {
        if (callback) callback(result);
    });
}

export function getGroup(userId, classId, callback) {
    fetchQuery('SELECT * FROM groupAssignees WHERE userId=? AND classId=? LIMIT 1', [ userId, classId ], (result) => {
        if (callback) callback(result);
    });
}