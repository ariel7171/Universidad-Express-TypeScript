import { Request, Response } from "express";
import { ProfesorModel } from "../models/profesorModel";
import { conexion } from '../database/conexion';

const profesorModel = new ProfesorModel();

export const obtenerProfesores = async (req: Request, res: Response) => {
    try {
        const profesores = await profesorModel.obtenerProfesores();
        res.status(200).json(profesores);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener profesores', error: error.message })
    }
};

export const obtenerProfesorPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const profesor = await profesorModel.obtenerProfesorPorId(Number(id));
        if (profesor) {
            res.status(200).json(profesor);
        } else {
            res.status(500).json({ message: 'Profesor no encontrado'});
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener el profesor', error: error.message});
    }    
};

export const crearProfesor = async (req: Request, res: Response) => {
    try{
        const nuevoProfesor = req.body;
        const profesor = await profesorModel.crearProfesor(nuevoProfesor);
        res.status(200).json(profesor);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al crear el profesor', error: error.message});
    }
};

export const actualizarProfesor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const profesor = req.body;
        const result: any = await profesorModel.actualizarProfesor(Number(id), profesor);
        if (result.affectedRows > 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: 'Profesor no encontrado'});
        }
        
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar el profesor', error: error.message});
    }
};

export const eliminarProfesor = async (req: Request, res: Response) => {
    const conn = await conexion.getConnection();
    await conn.beginTransaction();

    try {
        const { id } = req.params;

        if (await profesorModel.cursosAsignados(Number(id))) {
            return res.status(500).json({ message: 'No se puede eliminar el profesor, porque tiene cursos asignados'});
        }

        const result: any = await profesorModel.eliminarProfesor(Number(id));

        if (result.affectedRows > 0) {
            await conn.commit();
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: 'Profesor no encontrado'});
        }
    } catch (error: any) {

        try {
            await conn.rollback();
        } catch (rollbackError: any) {
            return res.status(500).json({ message: 'Error al realizar el rollback', error: rollbackError.message});
        }

        return res.status(500).json({ message: 'Error al eliminar el profesor', error: error.message});
    } finally {
        conn.release();
    }
};