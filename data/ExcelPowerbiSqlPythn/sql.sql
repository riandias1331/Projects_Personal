CREATE TABLE sales (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    region VARCHAR(50),
    product VARCHAR(50),
    quantity INT,
    price DECIMAL(10, 2)
);
