import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Beneficiary } from '../models/Beneficiary.js';
import { Volunteer } from '../models/Volunteer.js';
import { Activity } from '../models/Activity.js';
import { SEED_BENEFICIARIES, SEED_VOLUNTEERS, SEED_ACTIVITIES } from './seedData.js';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/saathi';

async function seed() {
  try {
    console.log(`Connecting to MongoDB at: ${uri}`);
    await mongoose.connect(uri);
    console.log('Connected! Clearing existing collections...');

    await Beneficiary.deleteMany({});
    await Volunteer.deleteMany({});
    await Activity.deleteMany({});

    console.log('Inserting seed volunteers...');
    await Volunteer.insertMany(SEED_VOLUNTEERS);

    console.log('Inserting seed activities...');
    await Activity.insertMany(SEED_ACTIVITIES);

    console.log('Inserting seed beneficiaries...');
    await Beneficiary.insertMany(SEED_BENEFICIARIES);

    console.log('✅ Database seeded successfully with realistic NGO data!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
