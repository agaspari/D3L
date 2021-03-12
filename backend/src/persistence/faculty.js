import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function fetchFacultyClasses(facultyId, callback) {
    fetchQuery('SELECT * FROM classes WHERE facultyId=?', [ facultyId ], (result) => {
        if (callback) callback(result);
    });
}

export function insertFacultyClass(classInfo, key, callback) {
    console.log(classInfo);
    executeQuery('INSERT INTO classes (facultyId, className, classKey) VALUES ?', [ classInfo.facultyId, classInfo.className, key ], (result) => {
        if (callback) callback(result);
    });
} 
