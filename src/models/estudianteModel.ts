// src/models/estudianteModel.ts
import { conexion } from '../database/conexion';

export class EstudianteModel {
    async obtenerEstudiantes() {
        const [rows] = await conexion.query('SELECT * FROM estudiantes');
        return rows;
    }

    /*async obtenerEstudiantePorId(id: number) {
        const [rows] = await conexion.query('SELECT * FROM estudiantes WHERE id = ?', [id]);
        return rows[0];
    }*/

    async obtenerEstudiantePorId(id: number) {
        const [rows] = await conexion.query('SELECT * FROM estudiantes WHERE id = ?', [id]);
        return (rows as any[])[0];
        //return rows;
    }

    async crearEstudiante(data: any) {
        const [result] = await conexion.query('INSERT INTO estudiantes SET ?', [data]);
        return result;
    }

    async actualizarEstudiante(id: number, data: any) {
        const [result] = await conexion.query('UPDATE estudiantes SET ? WHERE id = ?', [data, id]);
        return result;
    }

    async eliminarEstudiante(id: number) {
        const [result] = await conexion.query('DELETE FROM estudiantes WHERE id = ?', [id]);
        return result;
    }
}
