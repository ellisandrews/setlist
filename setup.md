# Deployment
-

## Overview
Setlist is comprised of 3 services:

1. PostgreSQL Database
2. Ruby on Rails JSON API
3. React UI

For ease of development and deployment, each service be run in its own docker container. For managing all three containers at once, the project has been set up to use [Docker Compose](https://docs.docker.com/compose/).

-



### Pre-setup
* Make sure `docker` and `docker-compose` are installed.


### Clone
```
$ git clone <repo>
```

### Development

Due to the fact that this application integrates with Spotify, you will have to set up a new application with Spotify that has its own credentials. Do this first.

Create postgres service `postgres.env` file

```
touch setlist/backend/postgres.env
```

Contents of `postgres.env`

```
# Postgres superuser setup
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
```

Create backend environment variables file.

```
touch setlist/backend/.env
```

Contents of `.env` file

```
# Secret for encoding/decoding JSON web tokens for auth
JWT_SECRET=<your_secret>

# Spotify Credentials
CLIENT_ID=<spotify_client_id>
CLIENT_SECRET=<spotify_client_secret>

# Rails Database Variables (for `backend/config/database.yaml`)
# `DB_HOST` variable is the name of the postgres service in `docker-compose.yml`
# Likely use the superuser username/password from `postgres.env` file here.
DB_HOST=db
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_PORT=5432
```

Spin up containers for each of the three services (`db`, `api`, and `ui`)

```
$ cd setlist
$ docker-compose up -d --build
```

Veryify that the containers are running successfully.

Initialize, migrate, and seed the database.

```
$ docker-compose run --rm api bundle exec rake db:create db:migrate db:seed
```

The UI can be accessed at `http://localhost:3001`