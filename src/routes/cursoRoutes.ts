// src/routes/cursoRoutes.ts
import { Router } from 'express';
import { obtenerCursos, obtenerCursosPorId, crearCurso, actualizarCurso, eliminarCurso } from '../controllers/cursoController';

const router = Router();

router.get('/cursos', obtenerCursos);
router.post('/cursos', crearCurso);
router.get('/cursos/:id', obtenerCursosPorId);
router.put('/cursos/:id', actualizarCurso);
router.delete('/cursos/:id', eliminarCurso);

export default router;