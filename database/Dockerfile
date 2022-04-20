FROM postgres:13
COPY ./up.sql /docker-entrypoint-initdb.d/
COPY ./seed.sql /docker-entrypoint-initdb.d/

RUN chown postgres:postgres /docker-entrypoint-initdb.d/up.sql
RUN chown postgres:postgres /docker-entrypoint-initdb.d/seed.sql