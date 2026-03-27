const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Question = require('../models/Question');

const MONGO_URI = process.env.MONGO_URI;

// Subject and Topic mapping (Marathi names)
const subjectMapping = {
  'cur': 'चालू घडामोडी',
  'env': 'पर्यावरण',
  'sci': 'सामान्य विज्ञान',
  'eco': 'अर्थव्यवस्था',
  'geo': 'भूगोल',
  'pol': 'राज्यशास्त्र',
  'history': 'इतिहास',
  'maharashtra': 'इतिहास',
  'ancient': 'इतिहास',
  'medieval': 'इतिहास',
  'modern': 'इतिहास'
};

const topicMapping = {
  // Current Affairs
  'national': 'राष्ट्रीय घटना',
  'state': 'राज्य घडामोडी',
  'international': 'आंतरराष्ट्रीय',
  'awards': 'पुरस्कार व नियुक्त्या',
  // Environment
  'ecology': 'परिसंस्था',
  'biodiversity': 'जैवविविधता',
  'climate': 'हवामान बदल',
  'pollution': 'प्रदूषण',
  // Science
  'physics': 'भौतिकशास्त्र',
  'chemistry': 'रसायनशास्त्र',
  'biology': 'जीवशास्त्र',
  'tech': 'तंत्रज्ञान',
  // Economics
  'national_income': 'राष्ट्रीय उत्पन्न',
  'banking': 'बँकिंग',
  'population': 'लोकसंख्या',
  'finance': 'सार्वजनिक वित्त',
  // Geography
  'physical': 'प्राकृतिक भूगोल',
  'maharashtra': 'महाराष्ट्राचा भूगोल',
  'economic': 'आर्थिक भूगोल',
  'world': 'जगाचा भूगोल',
  // Polity
  'constitution': 'राज्यघटना',
  'parliament': 'संसद व कायदेमंडळ',
  'judiciary': 'न्यायव्यवस्था',
  'local': 'स्थानिक स्वराज्य संस्था'
};

async function seedAll() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Cloud MongoDB');

    const tmpDir = path.join(__dirname, '../tmp');
    const files = fs.readdirSync(tmpDir).filter(f => f.endsWith('.json') && f !== 'history_questions.json');

    for (const file of files) {
      const filePath = path.join(tmpDir, file);
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      const prefix = file.split('_')[0];
      const topicKey = file.split('_')[1];
      
      const subject = subjectMapping[prefix] || 'सामान्य अभ्यास';
      const subsection = topicMapping[topicKey] || topicKey;

      console.log(`Seeding ${file} -> Subject: ${subject}, Subsection: ${subsection}`);

      const mapped = questions.map(q => {
        const text = q.questionText || q.text;
        const hash = crypto.createHash('md5').update(text + subsection + q.testNumber).digest('hex');
        
        return {
          text: text,
          options: q.options,
          correctAnswer: q.correctAnswer,
          subject: subject,
          topic: subsection,
          difficulty: (q.difficulty || 'medium').toLowerCase(),
          section: 'स्पर्धा परीक्षा तयारी',
          subsection: subsection,
          explanation: q.explanation,
          testNumber: String(q.testNumber),
          questionHash: hash
        };
      });

      for (const q of mapped) {
        await Question.findOneAndUpdate(
          { questionHash: q.questionHash },
          { $set: q },
          { upsert: true, new: true }
        );
      }
    }

    console.log('Master seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Master seeding failed:', err);
    process.exit(1);
  }
}

seedAll();
