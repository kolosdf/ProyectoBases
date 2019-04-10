CREATE VIEW PosicionFinalTaxis AS
WITH ultimaPosTaxiV AS (SELECT placa, max(fecha) as fecha, max(hora) as hora
						FROM registro
						GROUP BY placa),
	 ultimaPosTaxi AS (SELECT idr,placa,coordenadax,coordenaday FROM registro NATURAL JOIN ultimaPosTaxiV)
SELECT * FROM conduce NATURAL JOIN ultimaPosTaxi