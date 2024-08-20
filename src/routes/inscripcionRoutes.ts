// src/routes/cursoRoutes.ts
import { Router } from 'express';
import { obtenerInscripciones, obtenerInscripcionesPorCurso, obtenerInscripcionesPorEstudiante, crearInscripcion, modificarInscripcion, eliminarInscripcion } from '../controllers/inscripcionController';

const router = Router();

router.get('/inscripciones', obtenerInscripciones);
router.post('/inscripciones', crearInscripcion);
router.get('/Inscripciones/curso/:id', obtenerInscripcionesPorCurso);
router.get('/inscripciones/estudiante/:id', obtenerInscripcionesPorEstudiante);
router.put('/inscripciones', modificarInscripcion);
router.delete('/inscripciones', eliminarInscripcion);

export default router;