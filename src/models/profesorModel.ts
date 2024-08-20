// src/models/profesorModel.ts
import { conexion } from '../database/conexion';

export class ProfesorModel {

    async obtenerProfesores(){
        const [rows] = await conexion.query('SELECT * FROM profesores');
        return rows;
    }

    async obtenerProfesorPorId(id: number) {
        const [rows] = await conexion.query('SELECT * FROM profesores WHERE id = ?', [id]);
        return (rows as any[])[0];
    }

    async cursosAsignados(id: number) {
        const cantidad: any = await conexion.query('SELECT COUNT(*) AS cant FROM cursos WHERE profesor_id = ?', [id]);
        return cantidad[0].cant > 0;
    }

    async crearProfesor(data: any){
        const[result] = await conexion.query('INSERT INTO profesores SET ?', [data]);
        return result;
    }

    async actualizarProfesor(id: number, data: any){
        const [result] = await conexion.query('UPDATE profesores SET ? WHERE id = ?',[data, id]);
        return result;
    }

    async eliminarProfesor(id: number){
        const [result] = await conexion.query('DELETE FROM profesores WHERE id = ?', [id]);
        return result;
    }
}

