# Backend ( API Django / DB PostgreSQL )

## Description

This is the backend of the project. It is a Django API that connects to a PostgreSQL database. It is deployed in a Docker container for easy use.

## Installation

To run the backend, you will need to have the following packages installed:

- Docker
- docker-compose

```bash
sudo apt install docker docker-compose
```

Once you have installed these packages, you can run the Docker image by executing the following command in your terminal:

```bash
docker-compose up -d --build
```

Then you need to initialize the database by executing the following command:

```bash
docker-compose exec web python manage.py migrate
```

## Usage

To use the API, you can use the following endpoints:

<!-- ... TODO -->