import config from '../configs/db-config.js';
import pkg from 'pg';

const { Client }  = pkg;

async function encontrarTodos() {
    let resultRows;
    try {
        const client = new Client(config);
        await client.connect();

        const result = await client.query('SELECT * FROM alumnos;');
        await client.end();

        resultRows = await result.rows.map(fila => {
            const a = new Alumno();
            a.id = fila.id;
            console.log(a)
            return a;
        });
        return
    } catch (e) {
        console.error(e)
        resultRows = null;
    } finally {
        return resultRows;
    }
}

export { encontrarTodos };