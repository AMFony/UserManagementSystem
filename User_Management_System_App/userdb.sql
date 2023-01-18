CREATE TABLE users
(
	userid SERIAL PRIMARY KEY,
	username VARCHAR(40) NOT NULL,
	password VARCHAR(150) NOT NULL,
	fullname VARCHAR(50) NOT NULL,
	birthdate date NOT NULL,
	gender VARCHAR(10) NOT NULL,
	mobile VARCHAR(20) NOT NULL,
	email VARCHAR(50) NOT NULL,
	picture VARCHAR(150) NULL
)