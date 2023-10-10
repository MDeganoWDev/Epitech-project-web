# base image
FROM python:3.11.5-slim-bullseye

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY ./requirements.txt .
COPY ./db.sql /docker-entrypoint-initdb.d/data.sql

RUN pip install -r requirements.txt

COPY . .