const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

// Environment Validation
const requiredEnvVars = ['MONGODB_URI', 'OPENAI_API_KEY', 'JWT_SECRET'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`FATAL ERROR: Environment variable ${varName} is missing.`);
    process.exit(1);
  }
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:');
    console.error('   Please make sure MongoDB is installed and running on your system.');
    console.error('   Error details:', err.message);
  });

// Routes (to be added)
app.get('/', (req, res) => {
  res.send('Extensio.ai API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const generatorRoutes = require('./routes/generatorRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/generate', generatorRoutes);
app.use('/api/projects', projectRoutes);

// Static folder for downloads
app.use('/downloads', express.static(path.join(__dirname, 'tmp')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
