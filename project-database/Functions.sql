------------------------------------ CONDUCTOR ------------------------------------------ 
-----------------------------------------------------------------------------------------
-- Función que agrega un conductor (Es utilizada en registro de conductor)
-- Si el conductor ya existe se retorna un Mensaje que indica que ya existe, en caso contrario, se agrega y
--se le indica al conductor que fue creado
CREATE OR REPLACE FUNCTION AddDriver (varchar(10),varchar(10), varchar(50), varchar(50), varchar(10),
								   	 varchar(50), date, varchar(100),varchar(10),varchar(10),varchar(20)) RETURNS varchar AS $$
	DECLARE
		Ccedula ALIAS FOR $1;
		CnumCel ALIAS FOR $2;
		Cnombre ALIAS FOR $3;
		Capellido ALIAS FOR $4;
		Cdisponibilidad ALIAS FOR $5;
		Ccontra ALIAS FOR $6;
		CfechaNac ALIAS FOR $7;
		Cemail ALIAS FOR $8;
		Cgenero ALIAS FOR $9;
		CnumeroC ALIAS FOR $10;
		Cbanco ALIAS FOR $11;
		
	BEGIN
		IF EXISTS (SELECT * FROM Conductor WHERE cedula= Ccedula)
		THEN 
			RETURN 'Usuario ya existe';
		END IF;
		
		INSERT INTO public.conductor
			VALUES (Ccedula,CnumCel,Cnombre,Capellido,Cdisponibilidad,Ccontra,CfechaNac,Cemail,Cgenero,CnumeroC,Cbanco);
		
		RETURN 'Usuario Creado';
		
	END
$$ LANGUAGE plpgsql;

-- Función de validación del conductor (usada en login), revisa si existe algun registro en la relacion Conductor con
--la cedula (conduCedula) y contraseña (conduPass) dados, retorna True si el usuario existe, False lo contrario
CREATE OR REPLACE FUNCTION ValidateDriver (varchar(10),varchar(50)) RETURNS boolean AS $$
	DECLARE
		conduCedula ALIAS FOR $1;
		conduPass ALIAS FOR $2;		
		
	BEGIN
		IF EXISTS (SELECT * FROM Conductor WHERE cedula= conduCedula AND contrasena= conduPass)
		THEN 
			RETURN True;
		END IF;
		
		RETURN False;
		
	END
$$ LANGUAGE plpgsql;

-- Funcion que cambia la disponibilidad del conductor con cedula "conduCedula" y le da el valor de "Cdispo"
CREATE OR REPLACE FUNCTION ChangeDispo (varchar(10),varchar(10)) RETURNS boolean AS $$
	DECLARE
		conduCedula ALIAS FOR $1;
		Cdispo ALIAS FOR $2;		
		
	BEGIN
		IF EXISTS (SELECT * FROM Conductor WHERE cedula= conduCedula)
		THEN 
			UPDATE public.conductor
				SET disponibilidad=Cdispo
				WHERE cedula=conduCedula;
			RETURN True;
		END IF;
		
		RETURN False;
		
	END
$$ LANGUAGE plpgsql;

-- Función encargada de realizar la desconección del conductor
-- Elimina el registro en la relación conduce que tiene al conductor (conduCedula) con el taxi con placa "placaT"
-- Cambia la disponibilidad del conductor a ocupado
CREATE OR REPLACE FUNCTION ExitDriver (varchar(10),varchar(7),varchar(10)) RETURNS boolean AS $$
	DECLARE
		conduCedula ALIAS FOR $1;
		placaT ALIAS FOR $2;
		Cdispo ALIAS FOR $3;		
		
	BEGIN
		DELETE FROM conduce WHERE cedula = conduCedula AND placa = placaT;
		UPDATE public.conductor
				SET disponibilidad = Cdispo
				WHERE cedula = conduCedula;		
		
		RETURN True;
		
	END
$$ LANGUAGE plpgsql;

-- Funcion que se encarga de revisar si el conductor con cedula "conduCedula" tiene que prestar un servicio
-- Actualmente esta función no esta siendo utilizada
CREATE OR REPLACE FUNCTION lookforService (varchar(10)) RETURNS boolean AS $$
	DECLARE
		conduCedula ALIAS FOR $1;	
		
	BEGIN
		IF EXISTS (SELECT * FROM servicio WHERE cedula=conduCedula AND estado='pendiente')
		THEN 
			RETURN True;
		END IF;
		
		RETURN False;
		
	END
$$ LANGUAGE plpgsql;

-- Funcion que se encarga de cambiar el estado de un servicio a "proceso" que indica que el servicio esta en proceso
-- Actualmente esta función no esta siendo utilizada
CREATE OR REPLACE FUNCTION startService (varchar(10),varchar(8)) RETURNS boolean AS $$
	DECLARE
		conduCedula ALIAS FOR $1;
		idSe ALIAS FOR $2;
		
	BEGIN
		UPDATE public.servicio
			SET estado='proceso'
			WHERE cedula=conduCedula AND ids=idSe;
		
		RETURN true;
		
	END
$$ LANGUAGE plpgsql;

-- Funcion que se encarga de solicitar la terminacion un servicio indicando la "solicitudFin" del conductor
-- Actualmente esta función no esta siendo utilizada
-- La función no es necesaria con el modelo de "siempre se presta un servicio", puesto que al terminarse el servicio se dio por dado y 
--no necesita el concentimiento de la otra parte
CREATE OR REPLACE FUNCTION askEndServiceC (varchar(10),varchar(8)) RETURNS boolean AS $$
	DECLARE
		conduCedula ALIAS FOR $1;
		idSe ALIAS FOR $2;
		
	BEGIN
		UPDATE public.servicio
			SET estado='solicitudFin'
			WHERE cedula=conduCedula AND ids=idSe;
		
		RETURN true;
		
	END
$$ LANGUAGE plpgsql;

-- Funcion que se encarga de terminar un servicio por parte del conductor
-- Actualmente esta función no esta siendo utilizada
CREATE OR REPLACE FUNCTION endServiceC (varchar(10),varchar(8)) RETURNS boolean AS $$
	DECLARE
		conduCedula ALIAS FOR $1;
		idSe ALIAS FOR $2;
		
	BEGIN
		UPDATE public.servicio
			SET estado='terminado'
			WHERE cedula=conduCedula AND ids=idSe;
		
		RETURN true;
		
	END
$$ LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------
--------------------------------------- TAXI --------------------------------------------
-----------------------------------------------------------------------------------------
-- Función que se encarga de revisar si un taxi se encuentra disponible para su uso, en caso de que el taxi,
--no este registrado, este ocupado o este disponible se le informa al sistema para continuar con el proceso de seleccion de taxi
CREATE OR REPLACE FUNCTION TaxiDisp (varchar(10),varchar(7)) RETURNS varchar AS $$
	DECLARE
		conduCedula ALIAS FOR $1;
		taxiPlaca ALIAS FOR $2;
		
	BEGIN
		IF NOT EXISTS (SELECT * FROM Taxi WHERE placa=taxiPlaca)
		THEN 
			RETURN 'Taxi no registrado';
		END IF;
		
		IF EXISTS (SELECT * FROM Conduce WHERE placa=taxiPlaca)
		THEN 
			RETURN 'Taxi no disponible';
		END IF;

		RETURN 'True';
		
	END
$$ LANGUAGE plpgsql;

-- Función que agrega un taxi (Es utilizada en "agregar taxi")
-- Si el taxi ya existe se retorna un mensaje que indica que ya existe, en caso contrario, se agrega y
--se indica que el taxi fue creado
CREATE OR REPLACE FUNCTION AddTaxi (varchar(7),varchar(10),varchar(10),
									   varchar(4), varchar(7),varchar(20)) RETURNS varchar AS $$
	DECLARE
		Tplaca ALIAS FOR $1;
		Tmarca ALIAS FOR $2;
		Tmodelo ALIAS FOR $3;
		Tano ALIAS FOR $4;
		Tbaul ALIAS FOR $5;
		Tsoat ALIAS FOR $6;
		
	BEGIN
		IF EXISTS (SELECT * FROM Taxi WHERE placa= Tplaca)
		THEN 
			RETURN 'Taxi ya está registrado';
		END IF;
		
		INSERT INTO public.taxi VALUES 
		(Tplaca, Tmarca, Tmodelo, Tano, Tbaul, Tsoat);
		
		RETURN 'Taxi Creado';
		
	END
$$ LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------
------------------------------------- USUARIO -------------------------------------------
-----------------------------------------------------------------------------------------
-- Función que agrega un usuario (Es utilizada en registro de usuario)
-- Si el usuario ya existe se retorna un Mensaje que indica que ya existe, en caso contrario, se agrega y
--se le indica al usuario que fue creado
CREATE OR REPLACE FUNCTION AddUser (varchar(10), varchar(50), varchar(50), varchar(100),
								   	 varchar(50), varchar(10), date, varchar(10), varchar(10)) RETURNS varchar AS $$
	DECLARE
		UnumCel ALIAS FOR $1;
		Unombre ALIAS FOR $2;
		Uapellido ALIAS FOR $3;
		UdireccionR ALIAS FOR $4;
		Ucontra ALIAS FOR $5;
		UtipoT ALIAS FOR $6;
		UfechaVencT ALIAS FOR $7;
		UnumeroT ALIAS FOR $8;
		UNumeroSegT ALIAS FOR $9;
		
	BEGIN
		IF EXISTS (SELECT * FROM Usuario WHERE numCel= UnumCel)
		THEN 
			RETURN 'Usuario ya existe';
		END IF;
		
		INSERT INTO public.usuario(
			numcel, nombre, apellido, dirresidencia, contrasena, tipot, fechavenct, numerot, numseguridadt)
			VALUES (UnumCel, Unombre, Uapellido, UdireccionR, Ucontra, UtipoT, UfechaVencT, UnumeroT, UNumeroSegT);
		
		RETURN 'Usuario Creado';
		
	END
$$ LANGUAGE plpgsql;

-- Función de validación del usuario (usada en login), revisa si existe algun registro en la relacion Usuario con
--el numero de celular (userCel) y contraseña (userPass) dados, retorna True si el usuario existe, False lo contrario
CREATE OR REPLACE FUNCTION ValidateUser (varchar(10),varchar(50)) RETURNS boolean AS $$
	DECLARE
		userCel ALIAS FOR $1;
		userPass ALIAS FOR $2;		
		
	BEGIN
		IF EXISTS (SELECT * FROM Usuario WHERE numcel= userCel AND contrasena= userPass)
		THEN 
			RETURN True;
		END IF;
		
		RETURN False;
		
	END
	$$ LANGUAGE plpgsql;
	
-- Funcion que se encarga de solicitar la terminacion un servicio indicando la "solicitudFin" de parte del usuario
-- Actualmente esta función no esta siendo utilizada
-- La función no es necesaria con el modelo de "siempre se presta un servicio", puesto que al terminarse el servicio se dio por dado y 
--no necesita el concentimiento de la otra parte
CREATE OR REPLACE FUNCTION askEndServiceU (varchar(10),varchar(8)) RETURNS boolean AS $$
	DECLARE
		numCelUs ALIAS FOR $1;
		idSe ALIAS FOR $2;
		
	BEGIN
		UPDATE public.servicio
			SET estado='solicitudFin'
			WHERE numCel=numCelUs AND ids=idSe;
		
		RETURN true;
		
	END
$$ LANGUAGE plpgsql;

-- Funcion que se encarga de terminar un servicio por parte del usuario
-- Actualmente esta función no esta siendo utilizada
CREATE OR REPLACE FUNCTION endServiceU (varchar(10),varchar(8)) RETURNS boolean AS $$
	DECLARE
		numCelUs ALIAS FOR $1;
		idSe ALIAS FOR $2;
		
	BEGIN
		UPDATE public.servicio
			SET estado='terminado'
			WHERE numCel=numCelUs AND ids=idSe;
		
		RETURN true;
		
	END
$$ LANGUAGE plpgsql;

-- Funcion que agrega un registro de peticion de servicio en la relacion servicio
CREATE OR REPLACE FUNCTION AskServiceU (integer,integer,varchar(20),varchar(6),date,varchar(5),float,float,float,float,varchar(10),varchar(10)) RETURNS boolean AS $$
	DECLARE
		SCostoC ALIAS FOR $1;
		SKmRecorrido ALIAS FOR $2;
		SEstado ALIAS FOR $3;
		SContador ALIAS FOR $4;
		SFechaIn ALIAS FOR $5;
		SHoraIn ALIAS FOR $6;
		SInicioRX ALIAS FOR $7;
		SInicioRY ALIAS FOR $8;
		SFinRX ALIAS FOR $9;
		SFinRY ALIAS FOR $10;
		SCedula ALIAS FOR $11;
		SCel ALIAS FOR $12;

		
	BEGIN
		INSERT INTO public.servicio(
			costocarr, kmrecorrido, estado, contador, fechaini, horaini, inicioruta, finruta, cedula, numcel)
			VALUES (SCostoC, SKmRecorrido, SEstado, SContador, SFechaIn, SHoraIn, geometry(point(SInicioRX, SInicioRY)), geometry(point(SFinRX, SFinY)), SCedula, SCel);
		
		RETURN true;
		
	END
$$ LANGUAGE plpgsql;