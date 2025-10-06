# NiceTrips

#backend part
run docker
··· 
docker compose build express
docker compose up -d
··· 
Noticed：express is the name: 
How to create/undo migrations in docker
···
docker compose exec express npm run migrate
docker compose exec express npm run migrate:undo
···

How to create/undo seeding which insert feak testing in docker db
···
docker compose exec express npm run seed
docker compose exec express npm run migrate:undo
···