CREATE TABLE users (
	id int(10) AUTO_INCREMENT PRIMARY KEY,
	name varchar(200),
	login varchar(200) unique,
	password varchar(200),
	createdAt DATETIME,
	updatedAt DATETIME
);

INSERT INTO users (name, login, password) VALUES ('Fellipe Barros', 'fellipearb', '$2a$05$kmwGgev4zOq8ECoZvamFIOcN3LYwTkrtmvgMcIh9RYUN4a/Cs37fG');
INSERT INTO users (name, login, password) VALUES ('João Barros', 'dwinfotec', '$2a$05$kmwGgev4zOq8ECoZvamFIOcN3LYwTkrtmvgMcIh9RYUN4a/Cs37fG');


CREATE TABLE clients (
	id int(10) AUTO_INCREMENT PRIMARY KEY,
	name varchar(200),
	email varchar(200) unique,
	tel varchar(11),
	cpf varchar(11),
	cep varchar(8),
	street varchar(200),
	number varchar(8),
	district varchar(200),
	city varchar(200),
	state varchar(200),
	complement longtext,
	notes longtext,
	createdAt DATETIME,
	updatedAt DATETIME
);

CREATE TABLE status (
	id int(10) AUTO_INCREMENT PRIMARY KEY,
	name varchar(30),
	types varchar(30),
	createdAt DATETIME,
	updatedAt DATETIME
);

INSERT INTO status (id, name, types) VALUES (1, 'Orçamento', 'estimate');
INSERT INTO status (id, name, types) VALUES (2, 'Aprovado', 'approved');
INSERT INTO status (id, name, types) VALUES (3, 'Cancelado', 'canceled');
INSERT INTO status (id, name, types) VALUES (4, 'Em andamento', 'progress');
INSERT INTO status (id, name, types) VALUES (5, 'Concluído', 'finish');
INSERT INTO status (id, name, types) VALUES (6, 'Entregue', 'delivered');


CREATE TABLE service_orders (
	id int(10) AUTO_INCREMENT PRIMARY KEY,
	client_id int(10),
	equipment varchar(200),
	brand varchar(200),
	identification varchar(200),
	reports longtext,
	description longtext,
	notes longtext,
	value varchar(200),
	status_id int(10),
	createdAt DATETIME,
	updatedAt DATETIME,
	closedAt DATETIME
);

INSERT INTO service_orders (client_id, equipment, brand, identification, reports, description, notes, value, status_id) 
VALUES (1, 'Notebook', 'Asus', 'Cor Azul', 'Tela riscada', 'computador nao liga', 'sem fonte', '100.00', 1);
INSERT INTO service_orders (client_id, equipment, brand, identification, reports, description, notes, value, status_id) VALUES (1, 'Notebook', 'Dell', 'Cor Preto', 'Tela riscada', 'computador nao liga', 'sem fonte', '200.00', 1);


CREATE TABLE service_orders_images (
	id int(10) AUTO_INCREMENT PRIMARY KEY,
	service_orders_id int(10),
	path longtext,
	createdAt DATETIME,
	updatedAt DATETIME
);

INSERT INTO service_orders_images (service_orders_id, path) VALUES (1, 'https://www.revistabula.com/wp/wp-content/uploads/2019/09/goku-610x350.jpg');
INSERT INTO service_orders_images (service_orders_id, path) VALUES (1, 'https://www.revistabula.com/wp/wp-content/uploads/2019/09/goku-610x350.jpg');


