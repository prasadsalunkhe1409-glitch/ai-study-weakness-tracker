const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/ai-study-tracker';

async function debug() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const question = await db.collection('questions').findOne({ subject: 'चालू घडामोडी' });
  console.log('Full Sample Record:', JSON.stringify(question, null, 2));
  process.exit(0);
}

debug();
