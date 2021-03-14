import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function insertTask(taskInfo, callback) {
    const { taskId, taskName, taskDescription, status, datePosted, dateDue, assignedUser, groupId, creatorId } = taskInfo;
    executeQuery('INSERT INTO tasks VALUES ?', [ taskId, taskName, taskDescription, status, new Date(datePosted), new Date(dateDue), assignedUser, groupId, creatorId ], (result) => {
        if (callback) callback(result);
    });
}

export function getTasks(groupId, callback) {
    fetchQuery('SELECT * FROM tasks WHERE groupId=?', [ groupId ], (result) => {
        if (callback) callback(result);
    });
}

export function deleteTask(taskId, callback) {
    updateQuery('DELETE FROM tasks WHERE taskId=?', [ taskId ], (result) => {
        if (callback) callback(result);
    });
}

export function updateTask(taskId, status, callback) {
    updateQuery('UPDATE tasks SET status=? WHERE taskId=?', [ status, taskId ], (result) => {
        if (callback) callback(result);
    });
}