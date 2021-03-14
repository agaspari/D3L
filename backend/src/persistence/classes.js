import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function fetchStudents(classId, callback) {
    fetchQuery('SELECT * FROM classAssignees INNER JOIN classes ON classes.classId = classAssignees.classId INNER JOIN users on classAssignees.userId = users.userId WHERE classAssignees.classId=?', [ classId ], (result) => {
        if (callback) callback(result);
    });
}