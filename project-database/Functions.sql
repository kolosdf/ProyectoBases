------------------------------------ CONDUCTOR ------------------------------------------ 
-----------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION AddDriver (varchar(10), varchar(30), varchar(30), varchar(20),
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

--------------------------------------- TAXI --------------------------------------------
-----------------------------------------------------------------------------------------
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

CREATE OR REPLACE FUNCTION AddTaxi (varchar(7),varchar(10),varchar(10),
									   varchar(4), varchar(7),varchar(10)) RETURNS varchar AS $$
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
CREATE OR REPLACE FUNCTION AddUser (varchar(10), varchar(30), varchar(30), varchar(20),
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