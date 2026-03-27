const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function debugConnect() {
  const uri = process.env.MONGO_URI;
  console.log('URI found:', uri ? 'YES (length: ' + uri.length + ')' : 'NO');
  
  if (!uri) {
    console.error('ERROR: MONGO_URI is not defined in .env');
    process.exit(1);
  }

  try {
    console.log('Attempting to connect to Cloud MongoDB...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('SUCCESS: Connected to Cloud MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('FAILURE: Could not connect to Cloud MongoDB');
    console.error(err);
    process.exit(1);
  }
}

debugConnect();
