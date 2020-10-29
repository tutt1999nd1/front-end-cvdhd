const { Pool, Client } = require('pg');
var util = require('util');

var config = require('../config/config');
var logger = require('../utils/logger');
exports.load = (sql,param) => {
    return new Promise((resolve, reject) => {
        var connection = new Client(config.dbOptions);
        connection.connect();

        connection.query(sql,param, (error, rs) => {
            if (error) {
                logger.error(error.message);
                reject(error);
            } else {
                resolve(rs.rows);
            }
            connection.end();
        });
    });
}

exports.save = (sql,param) => {
    return new Promise((resolve, reject) => {
        var connection = new Client(config.dbOptions);
        connection.connect();

        connection.query(sql,param, function(error, rs) {
            if (error) {
                logger.error(error.message);
                reject(error);
            } else {
                resolve(rs.rows);
            }
            connection.end();
        });
    });
}