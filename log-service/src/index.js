const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const logRoutes = require('./routes/logRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/logs', logRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ordersync_logs';

mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Log service corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err));
