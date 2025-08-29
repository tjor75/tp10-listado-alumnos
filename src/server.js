import 'dotenv/config';
import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
import path     from "path";
import alumnosController from './controllers/alumnos-controller.js';

const app  = express();
const port = 3000;

// Agrego los Middlewares
app.use(cors());            // Middleware de CORS
app.use(express.json());    // Middleware para parsear y comprender JSON
app.use('/static', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/alumnos', alumnosController);

//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})