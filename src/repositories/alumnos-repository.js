import config from '../configs/db-config.js';
import { Pool } from 'pg';

class AlumnosRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async getAllAsync() {
        const sql = `SELECT * FROM alumnos;`;
        const result = await this.pool.query(sql);
        return result.rows;
    }

    async getByIdAsync(id) {
        const sql = `SELECT * FROM alumnos WHERE id = $1 LIMIT 1;`;
        const result = await this.pool.query(sql, [id]);
        return result.rows[0];
    }

    async createAsync(entity) {
        const sql = `INSERT INTO alumnos (nombre, apellido, id_curso, fecha_nacimiento, hace_deportes)
                     VALUES ($1, $2, $3, $4, $5);`;
        const resultPg = await this.pool.query(sql, [
            entity.nombre,
            entity.apellido,
            entity.id_curso,
            entity.fecha_nacimiento,
            entity.hace_deportes
        ]);
        return resultPg.rowCount > 0;
    }

    async updateAsync(entity) {
        const sql = `UPDATE alumnos SET nombre = $2, apellido = $3, id_curso = $4, fecha_nacimiento = $5, hace_deportes = $6
                     WHERE id = $1;`;
        const resultPg = await this.pool.query(sql, [
            entity.id,
            entity.nombre,
            entity.apellido,
            entity.id_curso,
            entity.fecha_nacimiento,
            entity.hace_deportes
        ]);
        return resultPg.rowCount > 0;
    }

    async deleteAsync(id) {
        const sql = `DELETE FROM alumnos WHERE id = $1;`;
        const resultPg = await this.pool.query(sql, [id]);
        return resultPg.rowCount > 0;
    }
}

export default AlumnosRepository;