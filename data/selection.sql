USE BamazonDB;

LOAD DATA LOCAL INFILE 'C:/Users/mkdin/Documents/BootCamp/Homeworks/Bamazon/assets/data/sample.csv' 
	INTO TABLE products FIELDS n
    TERMINATED BY ',' 
    ENCLOSED BY '"' LINES 
    TERMINATED BY '\n';

SELECT * FROM products;

