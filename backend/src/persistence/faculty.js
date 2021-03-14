import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function fetchFacultyClasses(facultyId, callback) {
    fetchQuery('SELECT * FROM classes WHERE facultyId=?', [ facultyId ], (result) => {
        if (callback) callback(result);
    });
}

export function insertFacultyClass(classInfo, key, callback) {
    executeQuery('INSERT INTO classes (facultyId, className, classKey) VALUES ?', [ classInfo.facultyId, classInfo.className, key ], (result) => {
        fetchQuery('SELECT classId FROM classes WHERE classKey = ?', [ key ], (result2) => {
            if (callback) callback(result, result2[0]);
        });
    });
} 
