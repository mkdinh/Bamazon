USE BamazonDB;

LOAD DATA LOCAL INFILE 'C:/Users/mkdin/Documents/BootCamp/Homeworks/Bamazon/assets/data/departmentSample.csv' 
	INTO TABLE departments FIELDS 
    TERMINATED BY ',' 
    ENCLOSED BY '"' LINES 
    TERMINATED BY '\n';

SELECT * FROM departments;
