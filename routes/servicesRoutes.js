import express from 'express';
import { createProject, getProject, updateItemsProject, getProjectById } from '../controllers/proyectosController.js';
import { createApplication, getApplication } from '../controllers/aplicacionesController.js';

const router = express.Router();

router.post('/projects', createProject);
router.put('/projects', updateItemsProject);
router.get('/projects', getProject);
router.get('/projects/:id', getProjectById);

router.post('/applications', createApplication);
router.get('/applications', getApplication);

export default router;