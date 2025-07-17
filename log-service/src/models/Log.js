const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  nivel: { type: String, enum: ['INFO', 'ERROR', 'WARN'], default: 'INFO' },
  modulo: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
