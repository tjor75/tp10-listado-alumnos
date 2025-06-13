import config from '../configs/db-config.js';
import pkg from 'pg';

const { Client }  = pkg;

async function encontrarTodos() {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('SELECT * FROM alumnos;');
    await client.end();

    return result.rows;
}

export { encontrarTodos };