// src/controllers/cursoController.ts
import { Request, Response } from "express";
import { CursoModel } from "../models/cursoModel";

const cursoModel = new CursoModel();

export const obtenerCursos = async (req: Request, res: Response) => {
    try{
        const cursos = await cursoModel.obtenerCursos();
        res.status(200).json(cursos);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener los cursos', error: error.message});
    }
};

export const obtenerCursosPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const curso = await cursoModel.obtenerCursoPorId(Number(id));
        res.status(200).json(curso);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener el curso', error: error.message});
    }
};

export const crearCurso = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, profesor_id } = req.body;
        if (!await cursoModel.verificarProfesor(profesor_id)) {
            return res.status(500).json({ message: 'Profesor no encontrado'})
        }
        const result = await cursoModel.crearCurso({ nombre, descripcion, profesor_id });
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al crear el curso', error: error.message});
    }
};

export const actualizarCurso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!await cursoModel.verificarProfesor(data.id)) {
            return res.status(500).json({ message: 'Profesor no encontrado'})
        }
        const result: any = await cursoModel.actualizarCurso(Number(id), data);
        if (result.affectedRows > 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: 'Curso no encontrado'});
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error al al actualizar el curso', error: error.message});
    }
};

export const eliminarCurso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await cursoModel.eliminarCurso(Number(id));
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar el curso', error: error.message});
    }
};