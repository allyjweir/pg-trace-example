#!/usr/bin/env bash
set -eu

if [ -e ./.env ]
  then
  source ./.env
fi

if [ -n "${DB_PREFIX:-}" ]
  then
  DB_NAME="${DB_PREFIX}_${DB_NAME}"
fi

export PGPASSWORD="${DB_PASSWORD}"
export db_host="${DB_HOST}"
export db_port="${DB_PORT}"
export db_user="${DB_USER}"
export db_name="${DB_NAME}"

psql --host "$db_host" --username "$db_user" --port "$db_port" -d postgres -lqt | cut -d \| -f 1 | grep -E "^[ ]*${db_name}[ ]*$" || \
psql --host "$db_host" --username "$db_user" --port "$db_port" -d postgres -c "CREATE DATABASE \"$db_name\";"
psql --host "$db_host" --username "$db_user" --port "$db_port" -d "$db_name" < db/schema.sql
