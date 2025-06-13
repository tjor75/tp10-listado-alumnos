import 'dotenv/config';
import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
import { StatusCodes } from 'http-status-codes';
import config from './configs/db-config.js';
import pkg from 'pg';

const { Client }  = pkg;

const app  = express();
const port = 3000;

// Agrego los Middlewares
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

//
// Acá abajo poner todos los EndPoints
// (por ejemplo)
//
app.get('/api/alumnos/', async (req, res) => {
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
app.get('/api/alumnos/:id', async (req, res) => {
    const SQL = `SELECT * FROM alumnos WHERE id = $1;`;
    const client = new Client(config);

    try {
        await client.connect();
        const resultPg = await client.query(SQL, [req.params.id]);

        if (resultPg.rowCount !== 0) {
            res.status(StatusCodes.NOT_FOUND).json(resultPg.rows[0]);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    } finally {
        await client.end();
    }
})
app.post('/api/alumnos/', async (req, res) => {
    res.sendStatus(200)
})
app.put('/api/alumnos/', async (req, res) => {
    res.sendStatus(200)
})
app.delete('/api/alumnos/:id', async (req, res) => {
    res.sendStatus(200)
})

//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})