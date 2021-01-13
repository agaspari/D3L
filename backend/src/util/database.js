const mysql = require('mysql');
import config from '../config.json';

const con = mysql.createConnection({
    host: config.databaseConfig.host,
    user: config.databaseConfig.user,
    password: config.databaseConfig.password,
    database: config.databaseConfig.database,
    charset : 'utf8mb4',
    supportBigNumbers: true // To support BIGINT database values
});

export function initalizeConnection() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Database Connection Initialized.");
    });
}

export function fetchQuery(query, params, callback) {
    con.query(query, params, function (err, result) {
        if (err) throw err;

        callback(result);
    });
}

export function executeQuery(query, params, callback) {
    con.query(query, [[ params ]], function (err, result) {
        if (err) throw err;
        
        if (callback) callback(result);
    });
}

export function updateQuery(query, params, callback) {
    con.query(query, params, function (err, result) {
        if (err) throw err;
        
        if (callback) callback(result);
    });
}