import pkg from 'pg';
import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
import config from './configs/db-config.js';
import {
    getIntegerOrDefault,
    getDateOrDefault,
    getBooleanOrDefault,
    isNombreApellido
} from './modules/validaciones-helper.js';

const { Client }  = pkg;
const router = Router();

router.get('/api/alumnos/', async (req, res) => {
    const SQL = `SELECT * FROM alumnos;`;
    const client = new Client(config);

    try {
        await client.connect();
        const resultPg = await client.query(SQL);
        res.status(StatusCodes.OK).json(resultPg.rows);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    } finally {
        await client.end();
    }
})
router.get('/api/alumnos/:id', async (req, res) => {
    const SQL = `SELECT TOP 1 * FROM alumnos WHERE id = $1;`;
    const client = new Client(config);
    const id = getIntegerOrDefault(req.params.id, 0);

    if (id > 0) {
        try {
            await client.connect();
            const resultPg = await client.query(SQL, [id]);

            if (resultPg.rowCount !== 0)
                res.status(StatusCodes.OK).json(resultPg.rows[0]);
            else
                res.sendStatus(StatusCodes.NOT_FOUND);

        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        } finally {
            await client.end();
        }
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
})
router.post('/api/alumnos/', async (req, res) => {
    const client = new Client(config);
    const nombre            = req.body?.nombre.trim();
    const apellido          = req.body?.apellido.trim();
    const id_curso          = getIntegerOrDefault(req.body?.id_curso, null);
    const fecha_nacimiento  = getDateOrDefault(req.body?.fecha_nacimiento, null);
    const hace_deportes     = getBooleanOrDefault(req.body?.hace_deportes, null);

    if (isNombreApellido(nombre) &&
        isNombreApellido(apellido) &&
        (id_curso === null || id_curso > 0)) {
        try {
            await client.connect();
            await client.query(
                `INSERT INTO alumnos (nombre, apellido, id_curso, fecha_nacimiento, hace_deportes)
                    VALUES ($1, $2, $3, $4, $5);`,
                [nombre, apellido, id_curso, fecha_nacimiento, hace_deportes]
            );

            res.sendStatus(StatusCodes.CREATED);
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        } finally {
            await client.end();
        }
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
})
router.put('/api/alumnos/', async (req, res) => {
    const client = new Client(config);
    const id                = getIntegerOrDefault(req.body?.id, 0);
    const nombre            = req.body?.nombre.trim();
    const apellido          = req.body?.apellido.trim();
    const id_curso          = getIntegerOrDefault(req.body?.id_curso, null);
    const fecha_nacimiento  = getDateOrDefault(req.body?.fecha_nacimiento, null);
    const hace_deportes     = getBooleanOrDefault(req.body?.hace_deportes, null);

    if (id > 0 &&
        isNombreApellido(nombre) &&
        isNombreApellido(apellido) &&
        (id_curso === null || id_curso > 0)) {
        try {
            await client.connect();
            const resultPg = await client.query(`SELECT TOP 1 id FROM alumnos WHERE id = $1;`, [id]);

            if (resultPg.rowCount !== 0) {
                await client.query(
                    `UPDATE alumnos
                        SET nombre = $2, apellido = $3, id_curso = $4, fecha_nacimiento = $5, hace_deportes = $6
                        WHERE id = $1;`,
                    [id, nombre, apellido, id_curso, fecha_nacimiento, hace_deportes]
                );

                res.sendStatus(StatusCodes.CREATED);
            } else {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }            
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        } finally {
            await client.end();
        }
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
})
router.delete('/api/alumnos/:id', async (req, res) => {
    const client = new Client(config);
    const id = getIntegerOrDefault(req.params.id, 0);

    if (id > 0) {
        try {
            await client.connect();
            const resultPg = await client.query(`SELECT TOP 1 id FROM alumnos WHERE id = $1;`, [id]);

            if (resultPg.rowCount !== 0) {
                await client.query(`DELETE FROM alumnos WHERE id = $1;`, [id]);
                res.sendStatus(StatusCodes.CREATED);
            } else {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }            
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        } finally {
            await client.end();
        }
    } else {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }
})

export default router;