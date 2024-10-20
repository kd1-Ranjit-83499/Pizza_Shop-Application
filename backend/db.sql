create DATABASE pizza_shop;

USE pizza_shop;

-- Table 1: User

CREATE TABLE user (
    id integer primary key auto_increment,
    firstName varchar(50),
    lastName varchar(50),
    email varchar(50),
    password varchar(100),
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Pizza

CREATE TABLE pizza (
    id integer primary key auto_increment,
    name varchar(50),
    details varchar(1024),
    price FLOAT,
    image varchar(100),
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pizza (name, details, price, image) value 
('Cheezy Cheese Veg', 'Double the satisfaction with Cheezy Cheese Veg & Loaded BBQ Veg Melts', 249, 'pizza1.webp'),
('Loaded BBQ Non-Veg', 'Satisfy your non veg cravings with Cheezy Cheese Chicken & Loaded Chicken BBQ Melts', 349, 'pizza2.webp'),
('Veggie Supreme', 'A supreme combination of black olives, green capsicum, mushroom, onion, spicy red paprika', 299, 'pizza3.jpg'),
('Peppy Paneer', 'Chunky paneer with crisp capsicum and spicy red pepper- quite a mouthfull', 199, 'pizza4.jpg'), 
('Mexican Green Wave', 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoesof exotic Mexican herbs',399, 'pizza5.jpg'),
('Deluxe Veggie', 'For a vegetarian looking for a BIG treat that goes easy on the spices, this ones got it all', 385, 'pizza6.jpg');

-- Table 3: Order

CREATE TABLE orderMaster (
    id integer primary key auto_increment,
    userId integer,
    totalAmount FLOAT,
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Order details

CREATE TABLE orderDetails (
    id integer primary key auto_increment,
    orderId integer,
    pizzaId integer,
    quantity integer,
    totalAmount FLOAT,
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);