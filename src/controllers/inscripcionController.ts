// src/controllers/inscripcionController.ts
import { Request, Response } from "express";
import { InscripcionModel } from "../models/inscripcionModel";
import { conexion } from "../database/conexion";

const inscripcionModel = new InscripcionModel();

export const obtenerInscripciones = async (req: Request, res: Response) => {
    try {
        const inscripciones = await inscripcionModel.obtenerInscripciones();
        res.status(200).json(inscripciones);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener las inscripciones', error: error.message});
    }
};

export const obtenerInscripcionesPorCurso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inscripcion = await inscripcionModel.obtenerInscripcionesPorCurso(Number(id));
        res.status(200).json(inscripcion);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener el curso', error: error.message});
    }
};

export const obtenerInscripcionesPorEstudiante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inscripcion = await inscripcionModel.obtenerInscripcionesPorEstudiante(Number(id));
        res.status(200).json(inscripcion);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener el curso', error: error.message});
    }
};

export const crearInscripcion = async (req: Request, res: Response) => {
    const conn = await conexion.getConnection();
    await conn.beginTransaction();

    try {
        const { curso_id, estudiante_id, nota } = req.body;
        if (!await inscripcionModel.existeCurso(Number(curso_id))) {
            return res.status(500).json({ message: 'Curso no encontrado' });
        }

        if (!await inscripcionModel.existeEstudiante(Number(estudiante_id))) {
            return res.status(500).json({ message: 'Estudiante no encontrado' });
        }

        const result = await inscripcionModel.crearInscripcion({ curso_id, estudiante_id, nota });
            
        await conn.commit();
        res.status(200).json(result);
    } catch (error: any) {
        try {
            await conn.rollback();
        } catch (rollbackError: any) {
            return res.status(500).json({ message: 'Error al realizar el rollback', error: rollbackError.message});
        }
        res.status(500).json({ message: 'Error al crear la inscripcion', error: error.message});
    } finally {
        conn.release();
    }
};

export const modificarInscripcion = async (req: Request, res: Response) => {
    const conn = await conexion.getConnection();
    await conn.beginTransaction();
    
    try {
        const { old_curso_id, old_estudiante_id, new_curso_id, new_estudiante_id, nota } = req.body;
        if (!await inscripcionModel.existeCurso(Number(new_curso_id))) {
            return res.status(500).json({ message: 'Curso no encontrado' });
        }
        
        if (!await inscripcionModel.existeEstudiante(Number(new_estudiante_id))) {
            return res.status(500).json({ message: 'Estudiante no encontrado' });
        }

        const result: any = await inscripcionModel.modificarInscripcion({old_curso_id, old_estudiante_id}, {new_curso_id, new_estudiante_id, nota});
        
        if (result.affectedRows === 0) {
            return res.status(500).json({ message: 'Inscripcion no encontrada'})
        }
        await conn.commit();
        res.status(200).json(result);
    } catch (error: any) {
        try {
            await conn.rollback();
        } catch (rollbackError: any) {
            return res.status(500).json({ message: 'Error al realizar el rollback', error: rollbackError.message});
        }
        res.status(500).json({ message: 'Error al modificar la inscripcion', error: error.message});
    } finally {
        conn.release();
    }
};

export const eliminarInscripcion = async (req: Request, res: Response) => {
    const conn = await conexion.getConnection();
    await conn.beginTransaction();

    try {
        const { curso_id, estudiante_id } = req.body;
        const result: any = await inscripcionModel.eliminarInscripcion(Number(curso_id), Number(estudiante_id));
        if (result.affectedRows === 0) {
            res.status(500).json({ message: 'No se encuentra la inscripcion'});
        }
        await conn.commit();
        res.status(200).json(result);
    } catch (error: any) {
        try {
            await conn.rollback();
        } catch (rollbackError: any) {
            return res.status(500).json({ message: 'Error al realizar el rollback', error: rollbackError.message});
        }
        res.status(500).json({ message: 'Error al eliminar la inscripcion', error: error.message});
    } finally {
        conn.release();
    }
};