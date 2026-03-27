// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config();

// connectDB();

// const app = express();

// // ✅ CORS FIX (IMPORTANT)
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // local frontend
//       "https://ai-study-weakness-tracker-jade.vercel.app", // deployed frontend
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/quizzes', require('./routes/quizRoutes'));
// app.use('/api/analysis', require('./routes/analysisRoutes'));
// app.use('/api/practice', require('./routes/practiceRoutes'));
// app.use('/api/recommendation', require('./routes/recommendationRoutes'));
// app.use('/api/performance', require('./routes/performanceRoutes'));
// app.use('/api/user', require('./routes/userStatsRoutes'));

// // Root route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(
    cors({
        origin: [
            "http://localhost:5173", // local frontend
            "https://ai-study-weakness-tracker-jade.vercel.app", // deployed frontend
        ],
        credentials: true,
    })
);

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/analysis', require('./routes/analysisRoutes'));
app.use('/api/practice', require('./routes/practiceRoutes'));
app.use('/api/recommendation', require('./routes/recommendationRoutes'));
app.use('/api/performance', require('./routes/performanceRoutes'));
app.use('/api/user', require('./routes/userStatsRoutes'));

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});