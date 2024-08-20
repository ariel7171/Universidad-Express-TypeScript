// src/routes/profesorRoutes.ts
import { Router } from "express";
import { obtenerProfesores, obtenerProfesorPorId, crearProfesor, actualizarProfesor, eliminarProfesor } from "../controllers/profesorController";

const router = Router();

router.get('/profesores', obtenerProfesores);
router.get('/profesores/:id', obtenerProfesorPorId);
router.post('/profesores', crearProfesor);
router.put('/profesores/:id', actualizarProfesor);
router.delete('/profesores/:id', eliminarProfesor);

export default router;