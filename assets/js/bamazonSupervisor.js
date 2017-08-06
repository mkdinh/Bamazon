
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

	// view all department
	displayDep()

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

function validateDep(input){
	// create query string or viewing department list
	var queryStr = 'SELECT DISTINCT department_name FROM departments';

	// run query on database to get unique department name
	connection.query(queryStr, function(err,data){
		// handle error
		if(err) throw err;

		// grabbing department list
		var depList = [];

		for(i = 0; i < data.length; i++){
			depList.push(data[i].department_name)
		}

		//  check if department already exist
		if(depList.indexOf(input) !== -1){
			console.log('\n\n >> This department already exists! \n')
			return;
		}
		// else if it doesnt exist
		return true;
		
	})
}


function displayDep(){
	// create query string
	var queryStr = 'SELECT * FROM departments';

	// run query on database
	connection.query(queryStr, function(err,data){
		// handle error
		if(err) throw err;

		// console log database into table
		console.table('\n',data)

		// restart process
		start();
	})
}

function start(){
	inquirer.prompt([
		// View possible actions
		{
			name: 'action',
			type: 'list',
			message: 'Welcome supervisor, which action would you like to take?\n',
			choices: ['View Products Sale by Department', 'Create New Department']
		}
	]).then(function(res){
		switch(res.action){

			//    * View Product Sales by Department
			case 'View Products Sale by Department':
				viewByDep();
				break
   
   			// * Create New Department
   			case 'Create New Department':
   				createDep();
		}
	});
}

function viewByDep(){
	// create query string or viewing department list
	var queryStr = 'SELECT DISTINCT department_name FROM departments';

	// run query on database to get unique department name
	connection.query(queryStr, function(err,data){
		// handle error
		if(err) throw err;

		// grabbing department list
		var depList = [];

		for(i = 0; i < data.length; i++){
			depList.push(data[i].department_name)
		}

		// choose department
		inquirer.prompt([
			{
				name: 'dep',
				type: 'list',
				message: 'Which department would you like to view the inventory of?',
				choices: depList
			}
		]).then(function(res){
			// display product using acquired department
			viewProduct(res.dep)
		})
	})
}

function viewProduct(dep){

	// create query string grabbing products with the same department name as query
	var queryStr = 'SELECT * FROM products WHERE department_name = ?';

	// run query on database
	connection.query(queryStr,[dep], function(err,data){
		// handle error
		if(err) throw err;

		if(data.length === 0)
			// if there is no product with < 5
			console.log('\n\tThere is no product in this department\n')
		else{
			// console log database into tble
			console.table('\n',data)
		}
		// restart process
		start();
	})
}

function createDep(){

	inquirer.prompt([
		{
			name: 'depName',
			message: 'What department would you like to add?',
			type: 'input',
			// validate: validateDep
		},
		{
			name: 'cost',
			message: 'What is the overhead cost of this new department?',
			type: 'input',
			validate: validateFloat
		},
	]).then(function(res){
		newDep(res.depName,res.cost)
	})
}

function newDep(name,cost){

	// create query string that add new department into departments table
	var queryStr = 'INSERT INTO departments (department_name, overhead_cost) VALUES (?,?)';

	// run query on database
	connection.query(queryStr,[name,cost], function(err,data){
		// handle error
		if(err) throw err;

		// restart process
		displayDep();
	})
}
