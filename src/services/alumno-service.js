import AlumnoRepository from "../respositories/alumno-repository";

const alumnoRepository = new AlumnoRepository();
export default class AlumnoService {
    getAllAsync = async () => {
        const alumnos = await alumnoRepository.getAllAsync();
        return alumnos;
    }

    getIdAsync = async () => {
        const client = new Client(config);
        const id = getIntegerOrDefault(req.params.id, 0);

        if (id > 0) {
            try {
                await client.connect();
                const resultPg = await client.query(SQL, [id]);

                if (resultPg.rowCount !== 0)
                    res.status(StatusCodes.OK).json(resultPg.rows[0]);
                else
                    res.sendStatus(StatusCodes.NOT_FOUND);

            } catch (e) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
            } finally {
                await client.end();
            }
        } else {
            res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
}