import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { getIntegerOrDefault, getDateOrDefault, getBooleanOrDefault, isNombreApellido } from '../modules/validaciones-helper.js';
import AlumnoService from '../services/alumno-service.js';

const router = Router();
const alumnoService = new AlumnoService();

router.get('/', async (req, res) => {
    const alumnos = await alumnoService.getAllAsync();

    if (alumnos !== null)
        res.status(StatusCodes.OK).json(alumnos);
    else
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: internalError });
})

router.get('/:id', async (req, res) => {
    const id = getIntegerOrDefault(req.params?.id, 0);
    let alumno;

    if (id > 0) {
        try {
            alumno = await alumnoService.getByIdAsync(id);
            if (alumno !== null)
                res.status(StatusCodes.OK).json(alumno);
            else
                res.sendStatus(StatusCodes.NOT_FOUND);
            
        } catch (internalError) {
            console.error(internalError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: internalError });
        }
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
})

router.post('/', async (req, res) => {
    const alumno = {
        nombre:             req.body?.nombre    ?? null,
        apellido:           req.body?.apellido  ?? null,
        idCurso:            getIntegerOrDefault(req.body?.id_curso, null),
        fechaNacimiento:    getDateOrDefault(req.body?.fecha_nacimiento, null),
        haceDeportes:       getBooleanOrDefault(req.body?.hace_deportes, null)
    };
    const requestError = validateAlumno(alumno);
    
    if (requestError !== '') {
        try {
            const id = await alumnoService.createAsync(alumno);

            if (id !== null)
                res.sendStatus(StatusCodes.CREATED);
            else
                res.sendStatus(StatusCodes.BAD_REQUEST);
        } catch (internalError) {
            console.error(internalError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: internalError });
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send(requestError);
    }
})

router.put('/', async (req, res) => {
    let rowsAffected;
    const alumno = {
        id:                 getIntegerOrDefault(req.body?.id, 0),
        nombre:             req.body?.nombre ?? null,
        apellido:           req.body?.apellido ?? null,
        idCurso:            getIntegerOrDefault(req.body?.id_curso, null),
        fechaNacimiento:    getDateOrDefault(req.body?.fecha_nacimiento, null),
        haceDeportes:       getBooleanOrDefault(req.body?.hace_deportes, null)
    };
    const requestError = validateAlumno(alumno);

    if (requestError === '') {
        try {
            rowsAffected = alumnoService.updateAsync(alumno);

            if (rowsAffected > 0) {
                res.sendStatus(StatusCodes.OK);
            } else {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        } catch (internalError) {
            console.error(internalError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: internalError });
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send(requestError);
    }
})

router.delete('/:id', async (req, res) => {
    let rowsAffected;
    const id = getIntegerOrDefault(req.params.id, 0);

    if (id > 0) {
        try {
            rowsAffected = await alumnoService.deleteByIdAsync(id);

            if (rowsAffected > 0) {
                res.sendStatus(StatusCodes.OK);
            } else {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        } catch (internalError) {
            console.error(internalError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: internalError });
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send('El id del alumno es inválido.');
    }
})

export default router;