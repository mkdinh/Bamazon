
// Declaring Modules

require('console.table');

var mysql = require('mysql');
var inquirer = require('inquirer');


// declare application variables

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

function validateFloat(input){

	// if type of input is not a number return
	if(!parseFloat(input)){
		console.log('\n\n >> you need to provide a number \n')
		return;
	}

	// else pass return value to be true
	return true
}

function start(){
	inquirer.prompt([
//     * View possible actions
		{
			name: 'action',
			type: 'list',
			message: 'Which action would you like to take?',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
		}
	]).then(function(res){
		switch(res.action){
			case 'View Products for Sale':
				viewProduct();
				break

			case 'View Low Inventory':
				viewLowInventory();
				break

			case 'Add to Inventory':
				addInventory();
				break

			case 'Add New Product':
				addProduct();
				break
		}
	});
}

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
function viewProduct(){

	// create query string
	var queryStr = 'SELECT * FROM products';

	// run query on database
	connection.query(queryStr, function(err,data){
		// handle error
		if(err) throw err;

		// console log database into tble
		console.table(data)

		// restart process
		start();
	})
}

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function viewLowInventory(){

	// create query string
	var queryStr = 'SELECT * FROM products WHERE stock_quantity < 5'

	// run query on database
	connection.query(queryStr,function(err,data){
		// handle error
		if(err) throw err;

		if(data.length === 0)
			// if there is no product with < 5
			console.log('\tNo product with quantity less than 5')
		else{
			// console.log data into table
			console.table(data)

			// restart process
			start();
		}
	})
}

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory(){
	inquirer.prompt([
		{
			name: 'id',
			message: 'Select the item id you would like to add',
			type: 'input',
			validate: validateNum
		},
		{
			name: 'num',
			message: 'Select the quantity you would like to add',
			type: 'input',
			validate: validateNum
		}
	]).then(function(res){
		updateInventory(res.id,res.num)
	})
}

function updateInventory(id,num){

	// create query string
	var queryStr = 'UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?'

	// run query on database to update new stock
	connection.query(queryStr,[num,id],function(err,data){
		// handle error
		if(err) throw err;

		// restart process
		start()
	})
}

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addProduct(){
	inquirer.prompt([
		{
			name: 'name',
			message: 'Name of the product',
			type: 'input',
			
		},
		{
			name: 'department',
			message: 'What department does it belong to?',
			type: 'input',
		},
		{
			name: 'price',
			message: 'What is the price of the product?',
			type: 'input',
			validate: validateFloat
		},
		{
			name: 'quantity',
			message: 'What is the starting quantity of the product?',
			type: 'input',
			validate: validateNum
		}
	]).then(function(res){
		// add new product to database
		newProduct(res)
	})
}

function newProduct(res){

	// fixed price to 2 decimal point
	res.price = parseFloat(res.price).toFixed(2);
	// parse stock quantity to int
	res.quantity = parseInt(res.quantity);

	// assigning appropriate variables to an array;
	var values = [res.name, res.department, res.price, res.quantity];
	
	// create query string
	var queryStr = 'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)';
					
	// run query on database to update new stock
	connection.query(queryStr,values,function(err,data){
		// handle error
		if(err) throw err;
		// restart process
		start()
	})
}