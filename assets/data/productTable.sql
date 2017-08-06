USE BamazonDB;

LOAD DATA LOCAL INFILE 'C:/Users/mkdin/Documents/BootCamp/Homeworks/Bamazon/assets/data/productSample.csv' 
	INTO TABLE products FIELDS 
    TERMINATED BY ',' 
    ENCLOSED BY '"' LINES 
    TERMINATED BY '\n';
describe products;
SELECT * FROM products;

