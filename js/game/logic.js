
$(document).ready(function(){

	// ---------------- Calling Modules------------------//
	require('console.table');

	var mysql = require('mysql');
	var inquirer = require('inquirer');

	// ---------------- Connect to database w/ SQL ------------------//

	// Connect to database
	var connection = mysql.createConnection({
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

	function start(){

	// ---------------- Home Tab Logics ------------------//


	// ---------------- Buy Tab Logics ------------------//
	displayItem();
	function displayItem(){
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


	// ---------------- Sell Tab Logics ------------------//


	// ---------------- Manage Tab Logics ------------------//

	}

	// ---------------- Materialize Initalization ------------------//

	// Initalize tabs
	$('ul.tabs').tabs('select_tab', 'tab_id');

});