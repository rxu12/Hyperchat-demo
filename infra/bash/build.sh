#!/bin/sh -x
docker-compose --project-name hypper-chat -f ../docker-compose/app.yaml -f ../docker-compose/ecr.yaml build