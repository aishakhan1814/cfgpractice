import { Router } from 'express';
import { volunteerController } from '../controllers/volunteerController.js';

const router = Router();

// GET /api/volunteers
router.get('/', volunteerController.getAll);

export default router;
