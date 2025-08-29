import AlumnosRepository from "../repositories/alumnos-repository.js";

class AlumnosService {
    constructor() {
        this.alumnosRepository = new AlumnosRepository();
    }

    async getAllAsync() {
        return await this.alumnosRepository.getAllAsync();
    }

    async getByIdAsync(id) {
        return await this.alumnosRepository.getByIdAsync(id);
    }

    async createAsync(entity) {
        return await this.alumnosRepository.createAsync(entity);
    }

    async updateAsync(entityUpdate) {
        const entity = await this.alumnosRepository.getByIdAsync(entityUpdate.id);
        if (!entity) return false;

        for (const key in entityUpdate) {
            if (entityUpdate[key] !== entity[key])
                entity[key] = entityUpdate[key];
        }

        return await this.alumnosRepository.updateAsync(entity);
    }

    async deleteAsync(id) {
        return await this.alumnosRepository.deleteAsync(id);
    }
}

export default AlumnosService;