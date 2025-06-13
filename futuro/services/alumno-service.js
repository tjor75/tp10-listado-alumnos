import Alumno from '../entities/alumno.js';
import repo from '';

function generarObjetoAlumno(fila) {
    const alumno = new Alumno();
    //const a = new Alumno(fila.id, fila.nombre, fila.apellido, fila.id_curso, file.fecha_nacimiento, fila.hace_deportes);
    alumno.id               = fila.id;
    alumno.nombre           = fila.nombre;
    alumno.apellido         = fila.apellido;
    alumno.id_curso         = fila.id_curso;
    alumno.fecha_nacimiento = fila.fecha_nacimiento;
    alumno.hace_deportes    = fila.hace_deportes;
    return alumno;
}

async function listarAlumnos() {
  const rows = await repo.encontrarTodos();
  return rows.map(fila => generarObjetoAlumno(fila));
}

async function crearAlumno(nombre, email) {
  const row = await repo.insertar(nombre, email);
  return new Alumno(row.id, row.nombre, row.email);

  

  
}

module.exports = { listarAlumnos, crearAlumno };