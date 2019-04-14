DROP TABLE IF EXISTS Conductor CASCADE;
DROP TABLE IF EXISTS Conduce CASCADE;
DROP TABLE IF EXISTS Taxi CASCADE;
DROP TABLE IF EXISTS Registro CASCADE;
DROP TABLE IF EXISTS Servicio CASCADE;
DROP TABLE IF EXISTS Usuario CASCADE;
DROP TABLE IF EXISTS Origenes CASCADE;
DROP TABLE IF EXISTS Destinos CASCADE;
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE Conductor (
	cedula varchar(10) NOT NULL,
	numCelular varchar(10) NOT NULL,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	disponibilidad varchar(10) NOT NULL,
	contrasena varchar(50) NOT NULL,
	fechaNac date NOT NULL,
	email varchar(100) NOT NULL,
	genero varchar(10) NOT NULL,
	numeroC varchar(10),
	banco varchar(20),

	PRIMARY KEY (cedula)
);

CREATE TABLE Taxi (
	placa varchar(7) NOT NULL,
	marca varchar(10) NOT NULL,
	modelo varchar(10) NOT NULL,
	ano varchar(4) NOT NULL,
	baul varchar(7) NOT NULL,
	soat varchar(20) NOT NULL,

	PRIMARY KEY (placa)
);


CREATE TABLE Conduce (
	cedula varchar(10) NOT NULL,
	placa varchar(7) NOT NULL,

	FOREIGN KEY (cedula) REFERENCES Conductor(cedula),
	FOREIGN KEY (placa) REFERENCES Taxi(placa)
);

CREATE TABLE Registro (
	idR SERIAL,
	fecha date NOT NULL,
	hora varchar(10) NOT NULL,
	coordenadas geometry NOT NULL,
	placa varchar(6) NOT NULL,

	PRIMARY KEY (idR),
	FOREIGN KEY (placa) REFERENCES Taxi(placa)
);

CREATE TABLE Usuario (
	numCel varchar(10) NOT NULL,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	dirResidencia varchar(100) NOT NULL,
	contrasena varchar(50) NOT NULL,
	tipoT varchar(10) NOT NULL,
	fechaVencT date,
	numeroT varchar(10) NOT NULL,
	numSeguridadT varchar(10) NOT NULL,
	coordenadaGPS geometry,

	PRIMARY KEY (numCel)
);

CREATE TABLE Servicio (
	idS SERIAL,
	costoCarr int NOT NULL,
	KmRecorrido int NOT NULL,
	estado varchar(20) NOT NULL,
	contador varchar(6) NOT NULL,
	calificacion float,
	fechaIni date NOT NULL,
	horaIni varchar(5) NOT NULL,
	fechaFin date,
	horaFin varchar(5),
	inicioRuta geometry NOT NULL,
	finRuta geometry NOT NULL,
	cedula varchar(10) NOT NULL,
	numCel varchar(10) NOT NULL,

	PRIMARY KEY (idS),
	FOREIGN KEY (cedula) REFERENCES Conductor(cedula),
	FOREIGN KEY (numCel) REFERENCES Usuario(numCel)
);

CREATE TABLE Origenes (	
	origen geometry NOT NULL,
	numCel varchar(10) NOT NULL,

	PRIMARY KEY (origen),
	FOREIGN KEY (numCel) REFERENCES Usuario(numCel)
);

CREATE TABLE Destinos (
	destino geometry NOT NULL,
	numCel varchar(10) NOT NULL,

	PRIMARY KEY (destino),
	FOREIGN KEY (numCel) REFERENCES Usuario(numCel)
);