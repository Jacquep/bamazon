CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
`id` INTEGER(100)  auto_increment NOT NULL,
`product_name` VARCHAR(100) NOT NULL,
`department_name` VARCHAR(100) NOT NULL,
`price` INTEGER(100) NOT NULL,
`stock_quantity` INTEGER (100) NOT NULL,
PRIMARY KEY(`id`)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("orion", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ursa major", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cygnus", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lyra", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("draco", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("aquila", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("perseus", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hydra", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hercules", "constellation", 90, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("delphinus", "constellation", 90, 1000);









