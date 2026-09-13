import { Router } from 'express';
import { interactionController } from '../controllers/interactionController.js';

const router = Router();

// POST /api/interactions
router.post('/', interactionController.create);

export default router;
