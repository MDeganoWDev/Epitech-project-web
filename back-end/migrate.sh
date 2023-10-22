#!/bin/sh



# Apply migrations
docker-compose exec web python jobapp/manage.py makemigrations
docker-compose exec web python jobapp/manage.py migrate
docker-compose exec web python jobapp/manage.py loaddata data
docker-compose exec web python jobapp/manage.py loaddata dummyUser
docker-compose exec web python jobapp/manage.py loaddata dummyUnregister
docker-compose exec web python jobapp/manage.py loaddata dummyCompanies
docker-compose exec web python jobapp/manage.py loaddata dummyAdvertisement
docker-compose exec web python jobapp/manage.py loaddata dummyApplication

# Start the Django development server
exec "$@"
