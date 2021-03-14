import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function createGroup(classId, groupName, groupKey, callback) {
    console.log(classId);
    executeQuery('INSERT INTO groups (classId, groupName, groupKey) VALUES ?', [ classId, groupName, groupKey ], (result) => {
        if (callback) callback(result);
    });
}

export function deleteGroup(groupId, callback) {
    updateQuery('DELETE FROM groupAssignees WHERE groupId=?', [ groupId ], () => {
        updateQuery('DELETE FROM groups WHERE groupId=?', [ groupId ], (result) => {
            if (callback) callback(result);
        });
    });
}

export function addMember(userId, groupId, classId, callback) {
    console.log(userId, groupId, classId);
    executeQuery('INSERT INTO groupAssignees (groupId, userId, classId) VALUES ?', [ groupId, userId, classId ], (result) => {
        if (callback) callback(result);
    });
}

export function removeMember(userId, groupId, callback) {
    updateQuery('DELETE FROM groupAssignees WHERE groupId=? AND userId=?', [ groupId, userId ], (result) => {
        if (callback) callback(result);
    });
}

export function getGroups(classId, callback) {
    fetchQuery('SELECT * FROM groups WHERE classId=?', [ classId ], (result) => {
        if (callback) callback(result);
    });
}

export function getAssignees(classId, callback) {
    fetchQuery('SELECT groups.groupId, groups.classId, groups.groupKey, groups.groupName, userId FROM groups LEFT OUTER JOIN groupAssignees ON groups.groupId = groupAssignees.groupId WHERE groups.classId=?', [ classId ], (result) => {
        if (callback) callback(result);
    });
}