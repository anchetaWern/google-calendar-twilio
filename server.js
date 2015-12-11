var google = require('./common/google');
var connection = require('./common/db');


var express = require('express');
var app = express();

app.get('/', function(req, res){
	var url = google.oauth2Client.generateAuthUrl({
	  access_type: google.config.access_type,
	  scope: google.config.scopes
	});

  	res.send('<a href="' + url + '">login to google</a>');
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


function updateAccessToken(tokens, response){

	connection.db.query(
		"UPDATE users SET access_token = ? WHERE id = 1", 
		[JSON.stringify(tokens)],
		function(err, rows, fields){
			if(!err){
				console.log('updated!');
				response.send('connected!');
			}else{
				console.log('error updating table');
				console.log(err);
				response.send('error occured, please try again');
			}
		}
	);

}


app.get('/login', function(req, res){
	var code = req.query.code;
  	console.log('login');

	google.oauth2Client.getToken(code, function(err, tokens){
	  
	  if(!err){
	  	console.log('tokens');
	  	console.log(tokens);
	    
	  	updateAccessToken(tokens, res);
	  
	  }else{
	  	res.send('error getting token');
	  	console.log('error getting token');
	  }
	});

});