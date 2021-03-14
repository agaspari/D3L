import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function joinClass(userId, classKey, callback) {
    console.log(userId, classKey);
    fetchQuery('SELECT * FROM classes WHERE classKey=?', [ classKey ], (result) => {
        executeQuery('INSERT INTO classAssignees (userId, classId) VALUES ?', [ userId, result[0].classId ], () => {
            if (callback) callback(result[0]);
        });
    });

} 

export function fetchStudentClasses(userId, callback) {
    fetchQuery('SELECT * FROM classes INNER JOIN classAssignees ON classes.classId = classAssignees.classId WHERE classAssignees.userId=?', [ userId ], (result) => {
        if (callback) callback(result);
    });
}