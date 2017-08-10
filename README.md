BAMAZON USING NODE.JS AND MYSQL	

------------ Prerequisites ------------

	HW js/
		- bamazonCustomer.js
		- bamazonManager.js
		- bamazonSupervisor.js
	data/
		- schema.sql
		- productSample.csv
		- productTable.sql
		- departmentSample.csv
		- departmentTable.csv

------------ Installing ------------

1. download repository on Github: https://github.com/mkdinh/Bamazon
2. Run data/schema.sql in mySQL to create database
3. Oen data/tables.sql in mySQL and change LOAD DATA LOCAL INFILE 'C:/../Bamazon/data/tables.sql' to the full path of the data/	tables.sql on your system

-------- Testing DB connection ----------

For each of the Bamazon~.js
	- open the file
	- change the key for 'user' and 'password' in the object 'connection' to your user and pass
	- run the file on terminal with node.js ex: 'node bamazonCustomer.js'
	- console should return 'connect to database with (id) ' 

------------ Example of Application ------------
