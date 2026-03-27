const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function listSubjects() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log('Connected to CLOUD MongoDB');
    
    const db = mongoose.connection.db;
    const subjects = await db.collection('questions').distinct('subject');
    console.log('Subjects in Cloud DB:', subjects);
    
    // Also check total count
    const total = await db.collection('questions').countDocuments();
    console.log('Total questions in Cloud DB:', total);

    process.exit(0);
  } catch (err) {
    console.error('List subjects failed:', err);
    process.exit(1);
  }
}

listSubjects();
