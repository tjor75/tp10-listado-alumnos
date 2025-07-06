import AlumnoRepository from "../respositories/alumno-repository.js";

const alumnoRepository = new AlumnoRepository();

export default class AlumnoService {
    getAllAsync = async () => {
        const returnArray = await alumnoRepository.getAllAsync();
        return returnArray;
    }
    
    getByIdAsync = async (id) => {
        const returnEntity = await alumnoRepository.getByIdAsync(id);
        return returnEntity;
    }
    
    createAsync = async (entity) => {
        const id = await alumnoRepository.createAsync(entity);
        return id;
    }
    
    updateAsync = async (entity) => {
        const rowsAffected = await alumnoRepository.updateAsync(entity);
        return rowsAffected;
    }

    deleteByIdAsync = async (id) => {
        const rowsAffected = await alumnoRepository.deleteByIdAsync(id);
        return rowsAffected;
    }
}