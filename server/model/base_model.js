var mysql = require('mysql');
var config = require('./db_config')
var connection = mysql.createConnection(config)

class BaseModel {
  constructor() {
    this.connection = connection;
  }

  query(queryString) {
    return new Promise((resolve, reject) => {
      connection.query(queryString, function (err, rows, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      })

    })
  }

  execute(queryString) {
    return new Promise((resolve, reject) => {
      connection.query(queryString, function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows);
        }
      })
    })
  }

  executeProcedure(procedureTemplate, arrayParam) {
    
    return new Promise((resolve, reject) => {
      connection.query(procedureTemplate, arrayParam, function (err, rows, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      })
    })
  }
}
module.exports = BaseModel;