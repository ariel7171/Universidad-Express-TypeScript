// src/models/inscripcionModel.ts
import { conexion } from "../database/conexion";

export class InscripcionModel {
  async obtenerInscripciones() {
    const [inscripciones] =
      await conexion.query(`SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso FROM cursos_estudiantes
                            INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id 
                            INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id`);
    return inscripciones;
  }

  async obtenerInscripcionesPorCurso(curso_id: Number) {
    const [inscripcion] = await conexion.query(
      `SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso FROM cursos_estudiantes
          INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id 
          INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id
          WHERE cursos_estudiantes.curso_id = ?`,
      [curso_id]
    );
    return inscripcion;
  }

  async obtenerInscripcionesPorEstudiante(estudiante_id: Number) {
    const [inscripcion] = await conexion.query(
      `SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso FROM cursos_estudiantes
          INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id 
          INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id
          WHERE cursos_estudiantes.estudiante_id = ?`,
      [estudiante_id]
    );
    return inscripcion;
  }

  async crearInscripcion(data: any) {
    const [result] = await conexion.query(
      `INSERT INTO cursos_estudiantes SET ?`,
      [data]
    );
    return result;
  }

  async existeEstudiante(estudiante_id: Number) {
    const [result] = await conexion.query(
      "SELECT COUNT(*) AS cant FROM estudiantes WHERE id = ?",
      [estudiante_id]
    );
    return (result as any)[0].cant > 0;
  }

  async existeCurso(curso_id: Number) {
    const [result] = await conexion.query(
      "SELECT COUNT(*) AS cant FROM cursos WHERE id = ?",
      [curso_id]
    );
    return (result as any)[0].cant > 0;
  }

  async modificarInscripcion(old_data: any, new_data: any) {
    const { old_curso_id, old_estudiante_id } = old_data;
    const { new_curso_id, new_estudiante_id, nota } = new_data;
    const [result] = await conexion.query(
      `UPDATE cursos_estudiantes SET curso_id = ?, estudiante_id = ?, nota = ? WHERE curso_id = ? AND estudiante_id = ?`,
      [new_curso_id, new_estudiante_id, nota, old_curso_id, old_estudiante_id]
    );
    return result;
  }

  async eliminarInscripcion(estudiante_id: Number, curso_id: Number) {
    const [result] = await conexion.query(
      `DELETE FROM cursos_estudiantes WHERE estudiante_id = ? AND curso_id = ?`,
      [estudiante_id, curso_id]
    );
    return result;
  }
}
