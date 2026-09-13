import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import beneficiaryRoutes from './routes/beneficiaryRoutes.js';
import interactionRoutes from './routes/interactionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend development
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Request logger for hackathon debugging
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Saathi Foundation Backend API',
  });
});

// Mount modular API routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/activities', activityRoutes);

// Error Handling Middleware
app.use(errorHandler);

import { Beneficiary } from './models/Beneficiary.js';
import { Volunteer } from './models/Volunteer.js';
import { Activity } from './models/Activity.js';
import { SEED_BENEFICIARIES, SEED_VOLUNTEERS, SEED_ACTIVITIES } from './seeds/seedData.js';

// Connect Database & Start Server
async function start() {
  const connected = await connectDB();
  if (connected) {
    try {
      const benCount = await Beneficiary.countDocuments();
      if (benCount === 0) {
        console.log('[MongoDB] Beneficiaries empty; auto-seeding initial records...');
        await Beneficiary.insertMany(SEED_BENEFICIARIES);
      }
      const volCount = await Volunteer.countDocuments();
      if (volCount === 0) {
        await Volunteer.insertMany(SEED_VOLUNTEERS);
      }
      const actCount = await Activity.countDocuments();
      if (actCount === 0) {
        await Activity.insertMany(SEED_ACTIVITIES);
      }
      console.log('[MongoDB] Database synchronized with seed records.');
    } catch (e) {
      console.warn('[MongoDB] Auto-seed check:', e.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Saathi Backend Service running on http://localhost:${PORT}`);
    console.log(`📡 Endpoints active:`);
    console.log(`   - GET  /api/dashboard`);
    console.log(`   - GET  /api/beneficiaries`);
    console.log(`   - GET  /api/beneficiaries/:id`);
    console.log(`   - POST /api/beneficiaries/:id/interactions`);
    console.log(`   - POST /api/interactions`);
    console.log(`   - PATCH /api/beneficiaries/:id/status`);
    console.log(`   - GET  /api/volunteers`);
    console.log(`   - GET  /api/activities`);
  });
}

start();

export default app;
