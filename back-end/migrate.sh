#!/bin/sh


# Apply migrations
docker-compose exec web python jobapp/manage.py makemigrations
docker-compose exec web python jobapp/manage.py migrate
docker-compose exec web python jobapp/manage.py loaddata data


# Start the Django development server
exec "$@"
