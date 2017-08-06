// Declaring Modules

require('console.table');

var mysql = require('mysql');
var inquirer = require('inquirer');


// declare application variables

var cart = [];
var total = 0;

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
	console.log('connect to database with id ',connection.threadId);

	// start module
	start();

	// end connection
	// connection.end();
})


function validateNum(input){

	// if type of input is not a number return
	if(!parseInt(input)){
		console.log('\n\n >> you need to provide a number \n')
		return;
	}

	// else pass return value to be true
	return true
}

// start javacript file
function start(){

	// display all items
	displayItem();
}


function displayItem(){
	// create query string
	var queryStr = 'SELECT * FROM products'
	// generate query
	connection.query(queryStr, function(err,data){
		
		// handle error
		if(err) throw err;

		// console log items
		console.table(data)
		console.log('\n')

		// inquirer for item 
		shop()
	})
}

function shop(){
	inquirer.prompt([
	
		// inquirer for id
		{
			name: 'id',
			message: "Select the id of the item you would like to purchase",
			type: 'input',
			validate: validateNum
		},
	
		// inquirer for number of items
		{
			name: 'stock',
			message: 'How many item would you like to purchase?',
			type: 'input',
			validate: validateNum
		} 

	]).then(function(res){
		// check for stock
		checkStock(res)

	})
}

function checkStock(res){

	// create query string
	var queryStr = 'SELECT * FROM products WHERE item_id= ?'

	// generate query to database
	connection.query(queryStr,[res.id],function(err,data){
		// handle error
		if(err) throw err;

		// assigning calc vars
		var product = data[0].product_name;
		var price = parseFloat(data[0].price);
		var availQuant = parseInt(data[0].stock_quantity)
		var buyQuant = parseInt(res.stock);

		// check if stock is available
		if((availQuant - buyQuant) > 0){
		// if available 

			// update available quantity
			
			// update stock on database with amount and id
			updateStock(res.id, buyQuant);

			// update cart
			cart.push(product + " x " + buyQuant);

			// update price
			total += buyQuant * price;

			// fixed total price to 2 decimal place
			total = total.toFixed(2);

			// console log current cart and total
			console.log('Current Cart: \n\n'
				+ cart.join(" || ") + "\n\n"
				+ "Total: \n"
				+ total + "\n\n"
				)

			// restart process
			start()
		}
		else{
		// if not available

			// return message not available
			console.log('\n\n',product,'ran out of stock! Check back again soon! \n\n')

			// restart process
			start();
		}
	})
}

function updateStock(id,num){
	var queryStr = 'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?';

	// Update stock quantity by id number
	connection.query(queryStr, [num, id], function(err,data){

		// handle error
		if(err) throw err;

	})
}