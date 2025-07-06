import DBConfig from "../configs/db-config.js";
import { Pool } from "pg";

const pool = new Pool(DBConfig);

export default class AlumnoRepository {
    getAllAsync = async () => {
        const SQL = `SELECT * FROM alumnos;`;
        const resultPg = await pool.query(SQL);
        const returnArray = resultPg.rows;

        return returnArray;
    }
    
    getByIdAsync = async (id) => {
        let returnEntity = null;
        const SQL = "SELECT * FROM alumnos WHERE id = $1 LIMIT 1;";
        const resultPg = await pool.query(SQL, [id]);

        if (resultPg.rows.length === 1)
            returnEntity = resultPg.rows[0];

        return returnEntity;
    }
    
    createAsync = async (entity) => {       
        let id = 0; 
        
        const SQL = `INSERT INTO alumnos (
                        nombre,
                        apellido,
                        id_curso,
                        fecha_nacimiento,
                        hace_deportes
                    )
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id;`;
        const values = [
            entity.nombre,
            entity.apellido,
            entity.idCurso,
            entity.fechaNacimiento,
            entity.haceDeportes
        ];
        const resultPg = await pool.query(SQL, values);
        if (resultPg.rows.length > 0)
            id = resultPg.rows[0].id;

        return id;
    }
    
    updateAsync = async (entity) => {
        const previousEntity = await this.getByIdAsync(entity.id);
        let rowsAffected = 0;

        if (previousEntity !== null) {
            const SQL = `UPDATE alumnos SET
                            nombre              = $2,
                            apellido            = $3,
                            id_curso            = $4,
                            fecha_nacimiento    = $5,
                            hace_deportes       = $6
                        WHERE id = $1;`;
            const values = [
                entity.id,
                entity.nombre           ?? previousEntity.nombre,
                entity.apellido         ?? previousEntity.apellido,
                entity.idCurso          ?? previousEntity.idCurso,
                entity.fechaNacimiento  ?? previousEntity.fechaNacimiento,
                entity.haceDeportes     ?? previousEntity.haceDeportes
            ];
                
            const resultPg = await pool.query(SQL, values);
            rowsAffected = resultPg.rowCount;
        }

        return rowsAffected;
    }
    
    deleteByIdAsync = async (id) => {
        const SQL = `DELETE FROM alumnos WHERE id = $1;`;
        const values = [id];
        const resultPg = await pool.query(SQL, values);
        const rowsAffected = resultPg.rowCount;

        return rowsAffected;
    }
}