// Declaring Modules
function Buy(){

	require('console.table');

	var mysql = require('mysql');
	var inquirer = require('inquirer');

	// Connect to database
	this.connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'dinh0824',
		database: 'BamazonDB'
	})

	connection.connect(function(err){

		// handle error
		if (err) throw err;

		// indicate thread id
		console.log('connect to database with id ',connection.threadId,'\n');

		// start module
		start();

		// end connection
		// connection.end();
	})


	// start javacript file
	this.start = function(){

		// display all items
		displayItem();
	}


	this.displayItem = function(){
		// create query string
		var queryStr = 'SELECT item_id, product_name,department_name,price,stock_quantity FROM products'
		// generate query
		connection.query(queryStr, function(err,data){
			
			// handle error
			if(err) throw err;

			// console log items
			console.table(data,'\n')

			// inquirer for item 
			shop()
		})
	}

}

module.exports = Buy;