COPY locations (name, latitude, longitude)
FROM '/docker-entrypoint-initdb.d/locations.csv'
WITH (FORMAT csv);