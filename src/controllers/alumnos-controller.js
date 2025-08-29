import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
import {
    getIntegerOrDefault,
    getDateOrDefault,
    getBooleanOrDefault,
    isNombreApellido
} from '../modules/validaciones-helper.js';
import AlumnosService from "../services/alumnos-service.js";

const router = Router();
const alumnosService = new AlumnosService();

//
// Acá abajo poner todos los EndPoints
// (por ejemplo)
//
router.get('/', async (req, res) => {
    try {
        const result = await alumnosService.getAllAsync();
        res.status(StatusCodes.OK).json(result);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
})

router.get('/:id', async (req, res) => {
    const id = getIntegerOrDefault(req.params.id, 0);

    if (id > 0) {
        try {
            const result = await alumnosService.getByIdAsync(id);

            if (result)
                res.status(StatusCodes.OK).json(result);
            else
                res.sendStatus(StatusCodes.NOT_FOUND);
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        }
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
})
router.post('/', async (req, res) => {
    const entity = {
        nombre: req.body?.nombre.trim(),
        apellido: req.body?.apellido.trim(),
        id_curso: getIntegerOrDefault(req.body?.id_curso, null),
        fecha_nacimiento: getDateOrDefault(req.body?.fecha_nacimiento, null),
        hace_deportes: getBooleanOrDefault(req.body?.hace_deportes, null)
    };

    if (isNombreApellido(entity.nombre) &&
        isNombreApellido(entity.apellido) &&
        (entity.id_curso === null || entity.id_curso > 0)) {
        try {
            const result = await alumnosService.createAsync(entity);

            if (result)
                res.sendStatus(StatusCodes.CREATED);
            else
                res.sendStatus(StatusCodes.NOT_FOUND);
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        }
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
})

router.put('/', async (req, res) => {
    const entity = {
        id: getIntegerOrDefault(req.body?.id, 0),
        nombre: req.body?.nombre.trim(),
        apellido: req.body?.apellido.trim(),
        id_curso: getIntegerOrDefault(req.body?.id_curso, null),
        fecha_nacimiento: getDateOrDefault(req.body?.fecha_nacimiento, null),
        hace_deportes: getBooleanOrDefault(req.body?.hace_deportes, null)
    };

    if (entity.id > 0 &&
        isNombreApellido(entity.nombre) &&
        isNombreApellido(entity.apellido) &&
        (entity.id_curso === null || entity.id_curso > 0)) {
        try {
            const result = await alumnosService.updateAsync(entity);

            if (result)
                res.sendStatus(StatusCodes.CREATED);
            else
                res.sendStatus(StatusCodes.NOT_FOUND);
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        }
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
})

router.put('/', async (req, res) => {
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
            const result = await alumnosService.updateAsync(id, {
                nombre,
                apellido,
                id_curso,
                fecha_nacimiento,
                hace_deportes
            });
            if (result) {
                res.sendStatus(StatusCodes.CREATED);
            } else {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        }
    } else {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
})

router.delete('/:id', async (req, res) => {
    const id = getIntegerOrDefault(req.params.id, 0);

    if (id > 0) {
        try {
            const result = await alumnosService.deleteAsync(id);
            if (result) {
                res.sendStatus(StatusCodes.CREATED);
            } else {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
        }
    } else {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }
})

export default router;