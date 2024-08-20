// src/app.ts
import express from 'express';
import estudianteRoutes from './routes/estudianteRoutes';
import profesorRoutes from './routes/profesorRoutes';
import cursoRoutes from './routes/cursoRoutes';

const app = express();

app.use(express.json());

app.use('/universidad', estudianteRoutes);
app.use('/universidad', profesorRoutes);
app.use('/universidad', cursoRoutes);

export default app;
