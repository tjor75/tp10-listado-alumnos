import DBConfig from "../configs/db-config.js";
import { Pool } from "pg";

const pool = new Pool(config);

export default class AlumnoRepository {
    getAllAsync = async () => {
        const SQL = "SELECT * FROM alumnos;";
        let resultArray = null;

        try {
            const resultPg = await pool.query(SQL);
            resultArray = resultPg.rows;
        } catch (error) {
            console.error(error);
        } finally {
            return resultArray;
        }
    }

    getByIdAsync = async (id) => {
        const SQL = "SELECT TOP 1 * FROM alumnos WHERE id = $1;";
        let resultUser = null;
        
        try {
            const resultPg = await pool.query(SQL, [id]);
            resultUser = resultPg.rows[0];
        } catch (error) {
            console.error(error);
        } finally {
            return resultUser;
        }
    }

    createAsync = async () => {

    }

    updateByIdAsync = async (id, nuevoUsuario) => {
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
    }

    deleteByIdAsync = async (id) => {
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
    }
}