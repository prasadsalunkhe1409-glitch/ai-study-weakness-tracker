const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/ai-study-tracker';

async function debug() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const question = await db.collection('questions').findOne({ subject: 'चालू घडामोडी' });
  console.log('testNumber value:', question.testNumber);
  console.log('testNumber type:', typeof question.testNumber);
  console.log('subsection value:', question.subsection);
  console.log('subject value:', question.subject);
  process.exit(0);
}

debug();
