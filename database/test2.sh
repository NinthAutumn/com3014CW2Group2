#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "tinder" <<-EOSQL
	CREATE DATABASE if not exists tinder;
EOSQL