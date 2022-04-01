const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var connector = require('../poolconnect');
exports.createTable = function (req, res) {
  connector.query(
    'CREATE TABLE user (id int AUTO_INCREMENT PRIMARY KEY,username varchar(30), password varchar(200))',
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
};
exports.RegisterUser = function (req, res) {
  const { id, username, password } = req.body;
  const checksql = `SELECT * FROM user WHERE username ="${username}"`;
  connector.query(checksql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      if (results.length > 0) {
        res.json({
          status: 0,
          data: 'Username already exists',
        });
      } else {
        const sql = 'INSERT INTO user VALUES(?,?,?)';
        connector.query(
          sql,
          [id, username, password],
          function (err, results, fields) {
            if (err) {
              res.json(err);
            } else {
              res.json({ status: 1, data: results });
            }
          }
        );
      }
    }
  });
};

exports.loginUser = async function (req, res) {
  const { id, username, password } = req.body;
  const checksql = `SELECT * FROM user WHERE username ="${username}" and password="${password}"`;
  connector.query(checksql, [username, password], (err, results) => {
    if (err) {
      res.json(err);
    } else {
      if (results.length === 0) {
        res.json({ status: 0, data: 'incorrect login details' });
      } else {
        const payLoad = {
          user: {
            username: username,
            password: password,
          },
        };
        jwt.sign(
          payLoad,
          'secret_string',
          {
            expiresIn: 1200,
          },
          (err, token) => {
            if (err) {
              throw (
                (error,
                res.json({
                  status: 0,
                  debug_data: 'Temorary error in backend',
                }))
              );
            }
            res.status(200).json({
              status: 1,
              token,
            });
          }
        );
      }
    }
  });
};
exports.getUsers = function (req, res) {
  const sql = 'SELECT * FROM user';
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
};
