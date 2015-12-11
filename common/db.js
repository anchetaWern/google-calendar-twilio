var config = require('config');

var db_config = config.get('db');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: db_config.host,
	user: db_config.user,
	password: db_config.password,
	database: db_config.database
});

exports.db = connection;
