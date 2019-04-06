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