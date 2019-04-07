------------------------------------ CONDUCTOR ------------------------------------------ 
-----------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION AddDriver (varchar(10),varchar(10),varchar(30),varchar(30),
									  varchar(10),varchar(50), date, varchar(50),
									  varchar(100),varchar(10),varchar(8),varchar(10),varchar(20)) RETURNS varchar AS $$
	DECLARE
		Ccedula ALIAS FOR $1;
		CnumCel ALIAS FOR $2;
		Cnombre ALIAS FOR $3;
		Capellido ALIAS FOR $4;
		Cdisponibilidad ALIAS FOR $5;
		Ccontra ALIAS FOR $6;
		CfechaNac ALIAS FOR $7;
		Cdireccion ALIAS FOR $8;
		Cemail ALIAS FOR $9;
		Cgenero ALIAS FOR $10;
		CmodoPago ALIAS FOR $11;
		CnumeroC ALIAS FOR $12;
		Cbanco ALIAS FOR $13;
		
	BEGIN
		IF EXISTS (SELECT * FROM Conductor WHERE cedula= Ccedula)
		THEN 
			RETURN 'Usuario ya existe';
		END IF;
		
		INSERT INTO public.conductor VALUES 
		(Ccedula, CnumCel, Cnombre, Capellido, Cdisponibilidad, Ccontra, CfechaNac, Cdireccion, Cemail, Cgenero, CmodoPago, CnumeroC, Cbanco);
		
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