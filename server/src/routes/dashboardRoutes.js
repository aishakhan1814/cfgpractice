import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController.js';

const router = Router();

// GET /api/dashboard
router.get('/', dashboardController.getOverview);

// GET /api/dashboard/metrics
router.get('/metrics', dashboardController.getOverview);

export default router;
