// src/routes/estudianteRoutes.ts
import { Router } from 'express';
import { obtenerEstudiantes, obtenerEstudiantePorId, crearEstudiante, actualizarEstudiante, eliminarEstudiante } from '../controllers/estudianteController';

const router = Router();

router.get('/estudiantes', obtenerEstudiantes);
router.post('/estudiantes', crearEstudiante);
router.get('/estudiantes/:id', obtenerEstudiantePorId);
router.put('/estudiantes/:id', actualizarEstudiante);
router.delete('/estudiantes/:id', eliminarEstudiante);

export default router;
