import { fetchQuery, executeQuery, updateQuery } from '../util/database';

export function createAssignment(assignmentInfo, callback) {
    const { assignmentName, assignmentDescription, dateDue, classId } = assignmentInfo;

    executeQuery('INSERT INTO assignments (assignmentName, assignmentDescription, datePosted, dateDue, classId) VALUES ?', [ assignmentName, assignmentDescription, new Date(), dateDue, classId ], (result) => {
        if (callback) callback(result);
    });
}

