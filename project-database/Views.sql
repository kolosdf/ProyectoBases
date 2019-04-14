CREATE VIEW PosicionFinalTaxis AS
WITH ultimaPosTaxiV AS (SELECT placa, max(fecha) as fecha, max(hora) as hora
						FROM registro
						GROUP BY placa),
	 ultimaPosTaxi AS (SELECT idr,placa, point(coordenadas) as p FROM registro NATURAL JOIN ultimaPosTaxiV)
SELECT * FROM conduce NATURAL JOIN ultimaPosTaxi