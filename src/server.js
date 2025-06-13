import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
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
    res.sendStatus(200)
})
app.get('/api/alumnos/:id', async (req, res) => {
    res.sendStatus(200)
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