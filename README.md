# [TP10] Listado alumnos

por Uriel Engelberg & Lucas Tjor

## Nota

Por razones de seguridad, la llave de OMDB API no se encuentra en este repositorio. Obtenga la suya en [OMDBAPI.com](https://www.omdbapi.com/)

## Requisitos

* Node.js
* PostgreSQL

## Instalación

1. Cree una base de datos en un servidor PostgreSQL. Puede llamarla como quiera.

2. Agregue tablas y datos corriendo las consultas de `documents/database/script-postgress.sql` en la base de datos.

3. Instale los módulos necesarios con `npm install`.

4. Duplique `.env.example` y edite con los datos correspondientes:
    ```
    # Usa PostgreSQL dato por dato 
    POSTGRES_HOST     = localhost
    POSTGRES_DATABASE = alumnos
    POSTGRES_USER     = postgres
    POSTGRES_PASSWORD = root
    POSTGRES_PORT     = 5432
    # O usando un database string. Va a reemplazar los datos de arriba
    # POSTGRES_STRING   = postgresql://postgres:root@localhost:5432/alumnos
    ```

## Correr

* Usá `npm start` para iniciar.
* Usá `npm run dev` para reiniciar automáticamente cuando se actualizan archivos.