import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function fetchUsers(guildId, callback) {
    fetchQuery('SELECT * FROM users u WHERE u.userId IN (SELECT userId FROM classAssignees WHERE classId=1 AND userId=u.userId) ORDER BY name ASC;', [guildId], (result) => {
        if (callback) callback(result);
    });
}

export function insertUser(userInfo, callback) {
    executeQuery('INSERT INTO users (userId, role, name, email, password) VALUES ?', [ userInfo.userId, userInfo.role, (userInfo.firstname + " " + userInfo.lastname), userInfo.email, userInfo.password ], (result) => {
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

export function getInfo(userId, callback) {
    fetchQuery('SELECT * FROM users WHERE userId = ?', [ userId ], (result) => {
        if (callback) callback(result);
    })
}

export function updateUser(userId, userInfo, callback) {
    console.log(userId, userInfo);
    updateQuery('UPDATE users SET name=?, bio=?, major=? WHERE userId=?', [ userInfo.name, userInfo.bio, userInfo.major, userId ], () => {
        
    });
}

export function fetchTasks(userId, callback) {
    fetchQuery('SELECT * FROM groupAssignees INNER JOIN tasks ON groupAssignees.groupId = tasks.groupId WHERE groupAssignees.userId=?', [ userId ], (result) => {
        if (callback) callback(result);
    });
}