CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(300) UNIQUE NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL, 
    password VARCHAR(300) NOT NULL
);