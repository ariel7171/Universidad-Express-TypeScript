// src/models/cursoModel.ts
import { QueryResult } from "mysql2";
import { conexion } from "../database/conexion";

export class CursoModel {
    
/*
    async obtenerCursos(): Promise<{ id: number, nombre: string, descripcion: string, precio: number }[]> {
        const [rows] = await conexion.query('SELECT * FROM cursos');
        return rows as { id: number, nombre: string, descripcion: string, precio: number }[];
    }
*/

    async obtenerCursos() {
        const [cursos] = await conexion.query('SELECT * FROM cursos');
        return cursos;
    }
   
    async obtenerCursoPorId(id: Number) {
        const [curso] = await conexion.query('SELECT * FROM cursos WHERE id = ?',[id]);
        return curso;
    }

    async crearCurso(data: any) {
        const [result] = await conexion.query('INSERT INTO cursos SET ?',[data]);
        return result;
    }

    async actualizarCurso(id: Number, data: any) {
        const [result] = await conexion.query('UPDATE cursos SET ? WHERE id = ?',[data, id]);
        return result;
    }

    async eliminarCurso(id: Number) {
        const [result] = await conexion.query('DELETE FROM cursos WHERE id = ?', [id]);
        return result;
    }

    async verificarProfesor(id: Number) {
        const [cantidad] = await conexion.query('SELECT COUNT(*) AS cant FROM profesores WHERE id = ?', [id]);
        return (cantidad as any)[0].cant > 0;
    }
}