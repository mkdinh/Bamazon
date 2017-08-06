DROP DATABASE IF EXISTS BamazonDB;
CREATE DATABASE BamazonDB;

use BamazonDB;

CREATE TABLE products(
	item_id INT(30) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price FLOAT(2),
    stock_quantity INT(30),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments(
	department_id INT(30) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    overhead_cost FLOAT(2),
    PRIMARY KEY(department_id)
);

