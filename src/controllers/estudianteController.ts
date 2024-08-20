// src/controllers/estudianteController.ts
import { Request, Response } from 'express';
import { EstudianteModel } from '../models/estudianteModel';

const estudianteModel = new EstudianteModel();

export const obtenerEstudiantes = async (req: Request, res: Response) => {
    try {
        const estudiantes = await estudianteModel.obtenerEstudiantes();
        res.status(200).json(estudiantes);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener estudiantes', error: error.message });
    }
};

export const obtenerEstudiantePorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const estudiante = await estudianteModel.obtenerEstudiantePorId(Number(id));
        if (estudiante) {
            res.status(200).json(estudiante);
        } else {
            res.status(500).json({ message: 'Estudiante no encontrado'});
        }
    } catch(error: any){
        res.status(500).json({ message: 'Error al obtener estudiante', error: error.message});
    }
};

export const crearEstudiante = async (req: Request, res: Response) => {
    try {
        const nuevoEstudiante = req.body;
        const result = await estudianteModel.crearEstudiante(nuevoEstudiante);
        res.status(200).json({ message: 'Estudiante creado', result });
    } catch(error: any){
        res.status(500).json({ message: 'Error al crear estudiante', error: error.message});
    }
};

export const actualizarEstudiante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result: any = await estudianteModel.actualizarEstudiante(Number(id), data);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Estudiante actualizado', result });
        } else {
            res.status(500).json({ message: 'Estudiante no encontrado'});
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar estudiante', error: error.message});
    }
};

export const eliminarEstudiante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: any = await estudianteModel.eliminarEstudiante(Number(id));
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Estudiante eliminado', result });
        } else {
            res.status(500).json({ message: 'Estudiante no encontrado'});
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar estudiante', error: error.message});
    }
};
