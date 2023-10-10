#!/bin/sh


# Apply migrations
docker-compose exec web python manage.py makemigrations polls
docker-compose exec web python manage.py sqlmigrate polls 0001
docker-compose exec web python manage.py migrate

# Start the Django development server
exec "$@"
