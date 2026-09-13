import { Router } from 'express';
import { activityController } from '../controllers/activityController.js';

const router = Router();

// GET /api/activities
router.get('/', activityController.getAll);

export default router;
