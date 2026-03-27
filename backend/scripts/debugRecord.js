const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/ai-study-tracker';

const questionSchema = new mongoose.Schema({
  text: String,
  subject: String,
  subsection: String,
  testNumber: Number
});

const Question = mongoose.model('Question', questionSchema);

async function debug() {
  await mongoose.connect(MONGO_URI);
  const q = await Question.findOne({ subject: 'चालू घडामोडी' });
  console.log('Sample Question:', JSON.stringify(q, null, 2));
  process.exit(0);
}

debug();
