# Deployment

This guide will take you through setting up a local development environment for a Setlist instance, as well as the current [production deployment on Heroku](https://setlist-frontend.herokuapp.com).

## Overview

Setlist is comprised of 3 services:

1. PostgreSQL Database
2. Ruby on Rails JSON API
3. React UI

For ease of development and deployment, these services have been set up to run in docker containers. They can all be spun up at once using [Docker Compose](https://docs.docker.com/compose/), which has already been configured for the project.

## Setup

#### Clone
Clone the repository and change directory.

```
$ git clone git@github.com:ellisandrews/setlist.git
$ cd setlist
```

#### Spotify
Due to the fact that this application integrates with Spotify, you will have to register a new application with Spotify that has its own credentials. Head over to Spotify's [Developer Dashboard](https://developer.spotify.com/dashboard/) to create a new account and generate client credentials for a new application.


#### PostgreSQL
Create an environment variables file in the `backend/` directory for the Postgres database service. Name it `postgres.env`.

```
$ touch backend/postgres.env
```

Create the following variables in `postgres.env`. They will be used to create a superuser for the Postgres instance.

```
# Postgres superuser setup
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
```

#### Environment Variables
Create an environment variables file in the `backend/` directory for the Rails API service. Name it `.env`.

```
$ touch backend/.env
```

Create the following variables in the `.env` file. They will be used to configure the Rails JSON API.

```
# Secret for encoding/decoding JSON web tokens for auth
JWT_SECRET=<your_secret>

# Spotify Credentials
CLIENT_ID=<spotify_client_id>
CLIENT_SECRET=<spotify_client_secret>

# Rails Database Variables (for `backend/config/database.yaml`)
# `DB_HOST` variable is the name of the postgres service in `docker-compose.yml`
# Use the superuser username/password from `postgres.env` file here.
DB_HOST=db
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_PORT=5432
```

#### Docker
Make sure `docker` and `docker-compose` are installed. [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

```
$ docker --version
Docker version 19.03.8, build afacb8b

$ docker-compose --version
docker-compose version 1.25.5, build 8a1c60f6
```

#### Local Development
Spin up the three containers (`db`, `api`, and `ui`) in development mode. Note that if you don't have the docker images downloaded, this will build them first. The source code is mounted into the `api` and `ui` containers so you can edit it in real time without rebuilding.

```
$ docker-compose up -d
Creating network "setlist_default" with the default driver
Creating setlist_db_1 ... done
Creating setlist_api_1 ... done
Creating setlist_ui_1  ... done
```

Veryify that the containers are running successfully.

```
$ docker ps
CONTAINER ID        IMAGE                                COMMAND                  CREATED             STATUS              PORTS                    NAMES
737528c4c7ef        eandrews08/setlist-ui:development    "docker-entrypoint.s…"   44 seconds ago      Up 43 seconds       0.0.0.0:3001->3001/tcp   setlist_ui_1
5652800cb6cf        eandrews08/setlist-api:development   "entrypoint.sh /bin/…"   44 seconds ago      Up 44 seconds       0.0.0.0:3000->3000/tcp   setlist_api_1
ac4f71b4e8f2        postgres                             "docker-entrypoint.s…"   45 seconds ago      Up 44 seconds       5432/tcp                 setlist_db_1
```

Initialize, migrate, and seed the database.

```
$ docker-compose run --rm api bundle exec rake db:create db:migrate db:seed
```

The UI can now be accessed at [http://localhost:3001](http://localhost:3001). The API is running on [http://localhost:3000](http://localhost:3000).

#### Teardown
To stop the three containerized services, run:

```
$ docker-compose down
```

Database data will be persisted in the `backend/tmp/db/dev/` directory, and read in again automatically upon restart. If you delete this directory, you will need to initialize, migrate, and seed the database again.

## Heroku

The production deployment is hosted for free on Heroku. The backend and frontend run as separate Heroku apps:

* DB/API: `setlist-backend.herokuapp.com`
* UI: [`setlist-frontend.herokuapp.com`](https://setlist-frontend.herokuapp.com)
 
To deploy new images to Heroku, build, tag, and push them to the Heroku container registry, and then release them.

```
# Build
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Tag
$ docker tag eandrews08/setlist-api:production registry.heroku.com/setlist-backend/web
$ docker tag eandrews08/setlist-ui:production registry.heroku.com/setlist-frontend/web

# Login to Heroku
$ heroku login
$ heroku container:login

# Push
$ docker push registry.heroku.com/setlist-backend/web
$ docker push registry.heroku.com/setlist-frontend/web

# Release
$ heroku container:release web --app setlist-backend
$ heroku container:release web --app setlist-frontend
```

Note that they each run as the `web` process in the Heroku app. Also note that Postgres is run as a [Heroku add-on](https://elements.heroku.com/addons) in production, instead of the official `postgres` image used in development.
