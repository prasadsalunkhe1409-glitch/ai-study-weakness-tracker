const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI;

const questionSchema = new mongoose.Schema({
  subject: String,
  section: String
});

const Question = mongoose.model('Question', questionSchema);

async function verifyAll() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to CLOUD MongoDB');

    const subjects = ['चालू घडामोडी', 'पर्यावरण', 'सामान्य विज्ञान', 'अर्थव्यवस्था'];
    
    for (const sub of subjects) {
      const count = await Question.countDocuments({ subject: sub, section: 'स्पर्धा परीक्षा तयारी' });
      console.log(`${sub}: ${count} questions`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Cloud verification failed:', err);
    process.exit(1);
  }
}

verifyAll();
